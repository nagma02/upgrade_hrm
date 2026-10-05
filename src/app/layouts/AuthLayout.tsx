import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="page-stack">
      <div className="app-shell__content">{children}</div>
    </div>
  )
}
