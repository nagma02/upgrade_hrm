import type { ReactNode } from 'react'

export function FormMessage({ children }: { children?: ReactNode }) {
  if (!children) {
    return null
  }

  return <p className="form-message" role="alert">{children}</p>
}