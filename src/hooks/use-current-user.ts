import { useAuth } from '@/app/providers/use-auth'

export function useCurrentUser() {
  return useAuth().user
}