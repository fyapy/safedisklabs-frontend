import type {
  Disk, File, Folder, FType,
} from './types'
import type { FilesListType } from 'routes'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { asyncErrorNotify, errorNotify, useNotificationsStore } from 'ducks/notifications'
import http, { createSearch } from 'utils/http'
import { toFormData } from 'utils/selectors'
import { getLink } from './fn'

type State = {
  pending: boolean
  pendingList: string[]
  data: Disk | null
  foldersList: Folder[]
  allList: File[]
  preview: File | Folder | null
  previewType: 'file' | 'folder' | null
}

export const useDiskStore = defineStore('disk', {
  state: (): State => ({
    pending: false,
    pendingList: [],
    data: null,
    foldersList: [],
    allList: [],
    preview: null,
    previewType: null,
  }),
  getters: {
    isEmptyDisk: state => state.data === null,
    inPendingList: state => (item: string) => state.pendingList.includes(item),
  },
  actions: {
    removePendingList(remove: string) {
      this.pendingList = this.pendingList.filter(item => item !== remove)
    },
    removeItemList(id: string, type: FType) {
      if (type === 'folder') {
        this.foldersList = this.foldersList.filter(folder => folder.id !== id)
      } else {
        this.allList = this.allList.filter(file => file.id !== id)
      }
    },
    updateItem(id: string, type: FType, key: string, value: any) {
      if (type === 'folder') {
        this.foldersList = this.foldersList.map(folder => folder.id === id
          ? ({ ...folder, [key]: value })
          : folder)
      } else {
        this.allList = this.allList.map(file => file.id === id
          ? ({ ...file, [key]: value })
          : file)
      }
    },
    async fetchDiskFiles(type?: FilesListType) {
      this.pending = true

      try {
        const search = type === 'dashboard'
          ? ''
          : createSearch({ type })
        const res = await http.get(`/disks/list${search}`)

        this.data = res.data
        this.allList = res.list.files
        this.foldersList = res.list.folders
      } catch (e) {
        await asyncErrorNotify(e)
      } finally {
        this.pending = false
      }
    },
    async upload(files: FileList | null, folderId: string | null = null) {
      if (files === null || files.length === 0) {
        return
      }
      this.pendingList.push('upload')

      const formData = toFormData({
        ...(folderId ? { folderId } : {}),
        diskId: this.data!.id,
        files,
      })

      try {
        const { list } = await http.post('/disks/upload', formData)

        this.allList.push(...list)
      } catch (e) {
        await asyncErrorNotify(e)
      } finally {
        this.removePendingList('upload')
      }
    },
    async createFolder(name: string, folderId: string | null = null) {
      this.pendingList.push('create-folder')

      const body = {
        folderId,
        diskId: this.data!.id,
        name,
      }

      try {
        const res = await http.post('/disks/create-folder', body)

        this.foldersList.push(res.data)
      } catch (e) {
        await asyncErrorNotify(e)
      } finally {
        this.removePendingList('create-folder')
      }
    },
    async toggleStarred(id: string, type: FType) {
      try {
        const { value } = await http.post('/disks/toggle-starred', { id, type })

        this.updateItem(id, type, 'starred', value)
      } catch (e) {
        await asyncErrorNotify(e)
      }
    },
    async toggleShared(id: string, type: FType) {
      try {
        const { value } = await http.post('/disks/toggle-shared', { id, type })

        this.updateItem(id, type, 'shared', value)

        if (this.preview?.id === id) {
          this.preview = {
            ...this.preview,
            shared: value,
          }
        }

        if (value) {
          return this.copyLink(id, type)
        }
      } catch (e) {
        await asyncErrorNotify(e)
      }
    },
    async copyLink(id: string, type: FType) {
      try {
        await navigator.clipboard.writeText(getLink(id, type))

        useNotificationsStore().asyncAdd({
          type: 'success',
          text: 'Copied to clipboard',
        })
      } catch (error) {
        errorNotify('Error copying to clipboard')
      }
    },
    async toggleHidden(id: string, type: FType) {
      try {
        await http.post('/disks/toggle-hidden', { id, type })

        this.removeItemList(id, type)
      } catch (e) {
        await asyncErrorNotify(e)
      }
    },
    async moveToBinOrRemove(id: string, type: FType) {
      try {
        await http.post('/disks/move-to-bin', { id, type })

        this.removeItemList(id, type)
      } catch (e) {
        await asyncErrorNotify(e)
      }
    },
    async fetchPreview(id: string) {
      this.pendingList.push('preview')

      try {
        const { data, type } = await http.get(`/disks/details/${id}`)

        this.preview = data
        this.previewType = type
      } catch (e) {
        await asyncErrorNotify(e)
      } finally {
        this.removePendingList('preview')
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDiskStore, import.meta.hot))
}
