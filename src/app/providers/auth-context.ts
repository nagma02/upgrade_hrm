import { createContext } from 'react'
import type { AuthSession, Permission, User } from '@/types/auth'

export type AuthContextValue = {
  session: AuthSession | null
  user: User | null
  isAuthenticated: boolean
  signIn: (credentials: { email: string; password: string; rememberMe: boolean }) => void
  signOut: () => void
  hasPermission: (permission: Permission) => boolean
}

export const AuthContext = createContext<AuthContextValue | null>(null)
