import type { NavigationGuardWithThis } from 'vue-router'
import { getAccessToken } from './selectors'

export const guestGuard: NavigationGuardWithThis<undefined> = () => {
  if (getAccessToken()) {
    return ({ path: '/dashboard' })
  }

  return true
}

export const authGuard: NavigationGuardWithThis<undefined> = () => {
  if (!getAccessToken()) {
    return ({ path: '/' })
  }

  return true
}
