import { classNames } from '@/utils/classNames'
import type { ReactNode } from 'react'

export function Button({
  children,
  variant = 'primary',
  type = 'button',
  disabled,
  onClick,
}: {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: () => void
}) {
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classNames('button', `button--${variant}`)}>
      {children}
    </button>
  )
}