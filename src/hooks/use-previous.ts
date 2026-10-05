import { useEffect, useState } from 'react'

export function usePrevious<T>(value: T) {
  const [state, setState] = useState<{ previous: T | undefined; current: T }>(() => ({
    previous: undefined,
    current: value,
  }))

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setState((current) => ({
        previous: current.current,
        current: value,
      }))
    }, 0)

    return () => window.clearTimeout(timer)
  }, [value])

  return state.previous
}