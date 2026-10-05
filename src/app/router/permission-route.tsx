import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { appRoutes } from '@/app/config/routes'
import { usePermission } from '@/hooks/use-permission'

export function PermissionRoute({
  permission,
  children,
}: {
  permission: string
  children: ReactNode
}) {
  const canAccess = usePermission(permission)
  const location = useLocation()

  if (!canAccess) {
    return <Navigate to={appRoutes.unauthorized} replace state={{ from: location.pathname }} />
  }

  return children
}
