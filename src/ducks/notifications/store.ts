import type { Notification, TimeoutsType } from './types'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { createId } from 'utils/string'
import i18n from 'i18n'

type State = {
  notifications: Notification[]
}

const timeouts: TimeoutsType = {}
const timeoutDelay = 5000

export const useNotificationsStore = defineStore('notifications', {
  state: (): State => ({
    notifications: [],
  }),
  actions: {
    remove(id: string) {
      this.notifications = this.notifications.filter(n => n.id !== id)
      delete timeouts[id]
    },
    asyncAdd(data: Omit<Notification, 'id' | 'timeout'>) {
      const id = createId()

      this.notifications = [...this.notifications, {
        id,
        timeout: timeoutDelay,
        ...data,
      }]

      timeouts[id] = setTimeout(() => this.remove(id), timeoutDelay)
    },
  },
})

export const asyncErrorNotify = async (error: any) => {
  const store = useNotificationsStore()

  if (typeof error?.json === 'function') {
    const json = await error.json()

    return store.asyncAdd({
      type: 'error',
      text: json.message || i18n.SOMETHING_WENT_WRONG,
    })
  }

  console.error(error.message)
  store.asyncAdd({
    type: 'error',
    text: i18n.SOMETHING_WENT_WRONG,
  })
}
export const errorNotify = (message?: string) => useNotificationsStore().asyncAdd({
  type: 'error',
  text: message || i18n.SOMETHING_WENT_WRONG,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNotificationsStore, import.meta.hot))
}
