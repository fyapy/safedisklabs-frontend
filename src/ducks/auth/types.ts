export interface User {
  id: number
  username: string
  email: string
  blockedAt?: string | null
  updatedAt: string
  createdAt: string
}
