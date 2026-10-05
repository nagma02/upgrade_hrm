export type Permission = string

export type User = {
  id: string
  name: string
  email: string
  role: string
  permissions: Permission[]
}

export type AuthSession = {
  accessToken?: string
  refreshToken?: string
  user: User
  expiresAt?: string
}