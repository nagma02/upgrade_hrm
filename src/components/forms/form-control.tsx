import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

type Props =
  | (InputHTMLAttributes<HTMLInputElement> & { rows?: never })
  | (TextareaHTMLAttributes<HTMLTextAreaElement> & { rows: number })

export function FormControl(props: Props) {
  return <>{'rows' in props ? <textarea {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)} /> : <input {...(props as InputHTMLAttributes<HTMLInputElement>)} />}</>
}