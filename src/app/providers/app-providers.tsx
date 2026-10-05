import { AuthProvider } from './auth-provider'
import type { ReactNode } from 'react'

export function AppProviders({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}