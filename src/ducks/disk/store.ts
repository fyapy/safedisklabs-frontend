import type { Disk, File, Folder } from './types'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { asyncErrorNotify } from 'ducks/notifications'
import http from 'utils/http'
import { toFormData } from 'utils/selectors'

type State = {
  pending: boolean
  pendingList: string[]
  data: Disk | null
  foldersList: Folder[]
  allList: File[]
}

export const useDiskStore = defineStore('disk', {
  state: (): State => ({
    pending: false,
    pendingList: [],
    data: null,
    foldersList: [],
    allList: [],
  }),
  getters: {
    isEmptyDisk: state => state.data === null,
    inPendingList: state => (item: string) => state.pendingList.includes(item),
  },
  actions: {
    removePendingList(remove: string) {
      this.pendingList = this.pendingList.filter(item => item !== remove)
    },
    async fetchDiskFiles() {
      this.pending = true

      try {
        const res = await http.get('/disks/list')

        this.data = res.data
        this.allList = res.list.files
        this.foldersList = res.list.folders
      } catch (e) {
        await asyncErrorNotify(e)
      } finally {
        this.pending = false
      }
    },
    async upload(files: FileList, folderId: string | null = null) {
      this.pendingList.push('upload')

      const formData = toFormData({
        ...(folderId ? { folderId } : {}),
        diskId: this.data!.id,
        files,
      })

      try {
        const res = await http.post('/disks/upload', formData)

        console.log(res)
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
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDiskStore, import.meta.hot))
}
