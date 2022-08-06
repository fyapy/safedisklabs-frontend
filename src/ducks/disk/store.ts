import type { Disk, File } from './types'
import type { FilesListType } from 'routes'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { asyncErrorNotify, errorNotify, useNotificationsStore } from 'ducks/notifications'
import http, { createAbortController, createSearch, isAbortError } from 'utils/http'
import { toFormData } from 'utils/selectors'
import { shareLink } from './fn'

type State = {
  pending: boolean
  pendingList: string[]
  data: Disk | null
  _allList: File[]
  paths: File[]
  preview: File | null
}

const abortList = createAbortController()

export const useDiskStore = defineStore('disk', {
  state: (): State => ({
    pending: false,
    pendingList: [],
    data: null,
    _allList: [],
    paths: [],
    preview: null,
  }),
  getters: {
    isEmptyDisk: state => state.data === null,
    inPendingList: state => (item: string) => state.pendingList.includes(item),
    allList: state => state._allList,
  },
  actions: {
    removePendingList(remove: string) {
      this.pendingList = this.pendingList.filter(item => item !== remove)
    },
    removeItemList(id: string) {
      this._allList = this._allList.filter(file => file.id !== id)
    },
    updateItem(id: string, key: string, value: any) {
      this._allList = this._allList.map(file => file.id === id
        ? ({ ...file, [key]: value })
        : file)
    },
    async fetchDiskFiles(type?: FilesListType, id?: string) {
      abortList.initAbort()
      this.pending = true

      try {
        const search = createSearch({
          ...(type !== 'dashboard' ? { type } : {}),
          ...(id ? { folderId: id } : {}),
        })
        const { data, list, paths } = await http.get(`/disks/list${search}`, abortList.getSignal())

        this.data = data
        this._allList = list
        this.paths = paths
      } catch (e) {
        if (isAbortError(e)) return

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

        this._allList.push(...list)
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

        this._allList.push(res.data)
      } catch (e) {
        await asyncErrorNotify(e)
      } finally {
        this.removePendingList('create-folder')
      }
    },
    async toggleStarred(id: string) {
      try {
        const { value } = await http.post(`/disks/toggle-starred/${id}`)

        this.updateItem(id, 'starred', value)
      } catch (e) {
        await asyncErrorNotify(e)
      }
    },
    async toggleShared(id: string) {
      try {
        const { value } = await http.post(`/disks/toggle-shared/${id}`)

        this.updateItem(id, 'shared', value)

        if (this.preview?.id === id) {
          this.preview = {
            ...this.preview,
            shared: value,
          }
        }

        if (value) {
          return this.copyLink(id)
        }
      } catch (e) {
        await asyncErrorNotify(e)
      }
    },
    async copyLink(id: string) {
      const file = this._allList.find(file => file.id === id)
      if (!file) {
        return
      }

      try {
        await navigator.clipboard.writeText(shareLink(id, file.type))

        useNotificationsStore().asyncAdd({
          type: 'success',
          text: 'Copied to clipboard',
        })
      } catch (error) {
        errorNotify('Error copying to clipboard')
      }
    },
    async toggleHidden(id: string) {
      try {
        await http.post(`/disks/toggle-hidden/${id}`)

        this.removeItemList(id)
      } catch (e) {
        await asyncErrorNotify(e)
      }
    },
    async moveToBinOrRemove(id: string) {
      try {
        await http.post(`/disks/move-to-bin/${id}`)

        this.removeItemList(id)
      } catch (e) {
        await asyncErrorNotify(e)
      }
    },
    async fetchPreview(id: string) {
      this.pendingList.push('preview')

      try {
        const { data } = await http.get(`/disks/details/${id}`)

        this.preview = data
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
