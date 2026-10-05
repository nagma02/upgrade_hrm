import { useEffect } from 'react'
import { navigateTo } from './navigation'

export function Redirect({ to }: { to: string }) {
  useEffect(() => {
    navigateTo(to)
  }, [to])

  return null
}