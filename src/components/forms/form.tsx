import type { FormEvent, ReactNode } from 'react'

export function Form({ children, onSubmit }: { children: ReactNode; onSubmit?: (event: FormEvent<HTMLFormElement>) => void }) {
  return <form onSubmit={onSubmit}>{children}</form>
}