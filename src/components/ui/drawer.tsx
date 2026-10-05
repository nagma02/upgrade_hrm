import type { ReactNode } from 'react'

export function Drawer({ open, title, children }: { open: boolean; title: string; children?: ReactNode }) {
  if (!open) {
    return null
  }

  return (
    <aside className="drawer" aria-label={title}>
      <strong>{title}</strong>
      {children}
    </aside>
  )
}