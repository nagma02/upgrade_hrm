import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { appRoutes } from '@/app/config/routes'
import { useAuth } from '@/app/providers/use-auth'

export function GuestRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to={appRoutes.dashboard} replace />
  }

  return children
}
