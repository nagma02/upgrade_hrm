import { Input } from './input'
import type { InputHTMLAttributes } from 'react'

export function TimePicker(props: InputHTMLAttributes<HTMLInputElement>) {
  return <Input type="time" {...props} />
}