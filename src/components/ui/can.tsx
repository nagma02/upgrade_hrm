import type { ReactNode } from 'react'
import { usePermission } from '@/hooks/use-permission'

export function Can({ permission, children, fallback = null }: { permission: string; children: ReactNode; fallback?: ReactNode }) {
  const allowed = usePermission(permission)
  return allowed ? children : fallback
}
