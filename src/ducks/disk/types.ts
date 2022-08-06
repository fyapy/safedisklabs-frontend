export interface Disk {
  id: string
  userId: number
  maxSize: string
  usedSize: string
  updatedAt: string
  createdAt: string
}

export type FileType = 'file' | 'folder'
export interface File {
  id: string
  name: string
  type: FileType
  userId: number
  diskId: string
  folderId: string | null
  hidden: boolean
  shared: boolean
  bin: boolean
  starred: boolean
  meta?: Meta
  updatedAt: string
  createdAt: string
}
export interface Meta {
  id: string
  fileId: string
  size: number
  ext: string | null
  mime: string | null
}
