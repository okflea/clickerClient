export interface User {
  id: string
  name: string
  email: string
  isAdmin: boolean
  isBlocked: boolean
  status: string
  createdAt: string
  updatedAt?: string
  score?: number
}
