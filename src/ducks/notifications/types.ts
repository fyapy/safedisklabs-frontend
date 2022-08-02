export type NotificationType = 'success' | 'error'
export type Notification = {
  id: string
  text: string
  type: NotificationType
  timeout: number
}

export type TimeoutsType = Record<string, ReturnType<typeof setTimeout>>
