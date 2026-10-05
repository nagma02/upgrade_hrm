import type { TextareaHTMLAttributes } from 'react'
import { classNames } from '@/utils/classNames'

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={classNames('textarea', className)} {...props} />
}