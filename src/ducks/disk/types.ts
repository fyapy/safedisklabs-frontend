export interface Disk {
  id: string
  userId: number
  maxSize: number
  usedSize: number
  updatedAt: string
  createdAt: string
}

export interface Folder {
  id: string
  name: string
  userId: number
  diskId: string
  folderId: string | null
  hidden: boolean
  shared: boolean
  starred: boolean
  updatedAt: string
  createdAt: string
}
export interface File {
  id: string
  name: string
  size: number
  exp: string | null
  mime: string | null
  userId: number
  diskId: string
  folderId: string | null
  hidden: boolean
  shared: boolean
  starred: boolean
  updatedAt: string
  createdAt: string
}
