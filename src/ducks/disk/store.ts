import type { Disk } from './types'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { asyncErrorNotify } from 'ducks/notifications'
import http from 'utils/http'

type State = {
  pending: boolean
  data: Disk | null
}

export const useDiskStore = defineStore('disk', {
  state: (): State => ({
    pending: false,
    data: null,
  }),
  getters: {
    isEmptyDisk: state => state.data === null,
  },
  actions: {
    async fetchDiskFiles() {
      this.pending = true

      try {
        const res = await http.get('/disks/list')

        this.data = res.data
      } catch (e) {
        await asyncErrorNotify(e)
      } finally {
        this.pending = false
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDiskStore, import.meta.hot))
}
