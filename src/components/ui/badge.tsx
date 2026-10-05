import { classNames } from '@/utils/classNames'
import type { ReactNode } from 'react'

export function Badge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode
  tone?: 'neutral' | 'success' | 'warning' | 'destructive' | 'info'
}) {
  return <span className={classNames('badge', `badge--${tone}`)}>{children}</span>
}