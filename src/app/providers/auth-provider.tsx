import { useEffect, useMemo, useState } from 'react'
import { AuthContext, AuthContextValue } from './auth-context'
import { clearAuthSession, createDemoSession, getStoredAuthSession } from '@/services/auth.service'
import type { ReactNode } from 'react'
import type { AuthSession, Permission, User } from '@/types/auth'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() => getStoredAuthSession())

  useEffect(() => {
    const handleUnauthorized = () => {
      clearAuthSession()
      setSession(null)
    }
    window.addEventListener('hrm:unauthorized', handleUnauthorized)
    return () => window.removeEventListener('hrm:unauthorized', handleUnauthorized)
  }, [])

  useEffect(() => {
    if (!session?.expiresAt) return
    const expiresIn = new Date(session.expiresAt).getTime() - Date.now()
    const timer = window.setTimeout(
      () => {
        clearAuthSession()
        setSession(null)
      },
      Math.max(0, expiresIn),
    )
    return () => window.clearTimeout(timer)
  }, [session])

  const value: AuthContextValue = useMemo(() => {
    const user: User | null = session?.user ?? null
    const permissions: Permission[] = user?.permissions ?? []

    return {
      session,
      user,
      isAuthenticated: Boolean(user),
      signIn: (credentials) => {
        const nextSession = createDemoSession(credentials)
        setSession(nextSession)
      },
      signOut: () => {
        clearAuthSession()
        setSession(null)
      },
      hasPermission: (permission: Permission) => permissions.includes(permission),
    }
  }, [session])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
