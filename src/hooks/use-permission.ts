import { useAuth } from '@/app/providers/use-auth'

export function usePermission(permission: string) {
  const { hasPermission } = useAuth()

  return hasPermission(permission)
}