import type { SelectHTMLAttributes } from 'react'
import { classNames } from '@/utils/classNames'

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={classNames('select', className)} {...props}>
      {children}
    </select>
  )
}