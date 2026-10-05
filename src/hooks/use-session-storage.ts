import { useEffect, useState } from 'react'

export function useSessionStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return defaultValue
    }

    const storedValue = window.sessionStorage.getItem(key)

    if (!storedValue) {
      return defaultValue
    }

    try {
      return JSON.parse(storedValue) as T
    } catch {
      return defaultValue
    }
  })

  useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}