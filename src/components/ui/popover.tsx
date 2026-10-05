import type { ReactNode } from 'react'

export function Popover({ trigger, children }: { trigger: ReactNode; children: ReactNode }) {
  return (
    <div className="popover">
      <div>{trigger}</div>
      <div className="popover__content">{children}</div>
    </div>
  )
}