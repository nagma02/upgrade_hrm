import { useState } from 'react'

export function useTableState<TFilters extends Record<string, string> = Record<string, string>>(
  initialPageSize = 10,
  initialFilters = {} as TFilters,
) {
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnFilters, setColumnFilters] = useState<TFilters>(initialFilters)
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})

  const reset = () => {
    setPageIndex(0)
    setGlobalFilter('')
    setColumnFilters(initialFilters)
    setRowSelection({})
  }

  return {
    pageIndex,
    setPageIndex,
    pageSize,
    setPageSize,
    globalFilter,
    setGlobalFilter,
    columnFilters,
    setColumnFilters,
    rowSelection,
    setRowSelection,
    reset,
  }
}
