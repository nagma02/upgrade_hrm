import type { ReactNode } from 'react'

export function FormDescription({ children }: { children: ReactNode }) {
  return <p className="form-description">{children}</p>
}