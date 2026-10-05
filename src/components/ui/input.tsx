import type { InputHTMLAttributes } from 'react'
import { classNames } from '@/utils/classNames'

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={classNames('input', className)} {...props} />
}