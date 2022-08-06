import type { FType } from './types'

export const getLink = (id: string, type: FType, full = true) => {
  const url = `/${type}/${id}`

  return full
    ? `${`${window.location.protocol}//${window.location.host}`}${url}`
    : url
}
