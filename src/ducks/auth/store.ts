import type { LoginValues, RegisterValues } from 'forms/auth/types'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { asyncErrorNotify } from 'ducks/notifications'
import http from 'utils/http'

type State = {
  pending: boolean
  isAuth: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    pending: false,
    isAuth: false,
  }),
  actions: {
    async login(values: LoginValues) {
      try {
        const res = await http.post('/auth/login', values)

        console.log(res)
      } catch (e) {
        await asyncErrorNotify(e)
      }
    },
    async register(values: RegisterValues) {
      try {
        const res = await http.post('/auth/register', values)

        console.log(res)
      } catch (e) {
        await asyncErrorNotify(e)
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
