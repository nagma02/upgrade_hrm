import { useState } from 'react'

export function useFilters<TFilters extends Record<string, string>>(initialFilters: TFilters) {
  const [filters, setFilters] = useState<TFilters>(initialFilters)

  return {
    filters,
    setFilter: <K extends keyof TFilters>(key: K, value: TFilters[K]) => {
      setFilters((current) => ({ ...current, [key]: value }))
    },
    resetFilters: () => setFilters(initialFilters),
  }
}