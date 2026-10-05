import { Input } from './input'
import type { InputHTMLAttributes } from 'react'

export function DatePicker(props: InputHTMLAttributes<HTMLInputElement>) {
  return <Input type="date" {...props} />
}