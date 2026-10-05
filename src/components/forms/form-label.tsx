import type { LabelHTMLAttributes, ReactNode } from 'react'
import { classNames } from '@/utils/classNames'

export function FormLabel({ children, className, ...props }: LabelHTMLAttributes<HTMLLabelElement> & { children: ReactNode }) {
  return (
    <label className={classNames('form-label', className)} {...props}>
      {children}
    </label>
  )
}