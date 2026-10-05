import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { appRoutes } from '@/app/config/routes'
import { AppLayout } from '@/app/layouts'
import { useAuth } from '@/app/providers/use-auth'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to={appRoutes.login} replace state={{ from: window.location.pathname }} />
  }

  return <AppLayout>{children}</AppLayout>
}
