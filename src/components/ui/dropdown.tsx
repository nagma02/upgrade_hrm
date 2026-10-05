import type { ReactNode } from 'react'

export function Dropdown({ trigger, children }: { trigger: ReactNode; children: ReactNode }) {
  return (
    <div className="dropdown">
      <div>{trigger}</div>
      <div className="dropdown__menu">{children}</div>
    </div>
  )
}