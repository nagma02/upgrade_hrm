import { Input } from './input'
import type { InputHTMLAttributes } from 'react'

export function SearchInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <Input type="search" placeholder="Search" {...props} />
}