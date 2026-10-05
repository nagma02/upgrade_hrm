import type { ReactNode } from 'react'

export function Accordion({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <details className="accordion">
      <summary>{title}</summary>
      {children}
    </details>
  )
}