import { Input } from './input'
import type { InputHTMLAttributes } from 'react'

export function Combobox(props: InputHTMLAttributes<HTMLInputElement>) {
  return <Input list="combobox-options" {...props} />
}