import type { ReactNode } from 'react'

export function Dialog({ open, title, children }: { open: boolean; title: string; children?: ReactNode }) {
  if (!open) {
    return null
  }

  return (
    <div className="dialog" role="dialog" aria-modal="true" aria-label={title}>
      <div className="dialog__panel">
        <strong>{title}</strong>
        {children}
      </div>
    </div>
  )
}