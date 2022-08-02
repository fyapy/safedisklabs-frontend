import type { User } from './types'
import type { LoginValues, RegisterValues } from 'forms/auth/types'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { router } from 'routes'
import { asyncErrorNotify } from 'ducks/notifications'
import http from 'utils/http'
import { setAccessToken } from 'utils/selectors'

type State = {
  pending: boolean
  isAuth: boolean
  data: User | null
}

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    pending: false,
    isAuth: false,
    data: null,
  }),
  actions: {
    async login(values: LoginValues) {
      try {
        const { user, accessToken } = await http.post('/auth/login', values)

        this.data = user
        setAccessToken(accessToken)
        router.push('/dashboard')
      } catch (e) {
        await asyncErrorNotify(e)
      }
    },
    async register(values: RegisterValues) {
      try {
        const { user, accessToken } = await http.post('/auth/register', values)

        this.data = user
        setAccessToken(accessToken)
        router.push('/dashboard')
      } catch (e) {
        await asyncErrorNotify(e)
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
