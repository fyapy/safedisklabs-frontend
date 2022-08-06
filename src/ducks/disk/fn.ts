import type { FileType } from './types'

export const shareLink = (id: string, type: FileType) =>
  `${`${window.location.protocol}//${window.location.host}`}/${type}/${id}`
