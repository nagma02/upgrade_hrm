import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useTableState } from './use-table-state'

describe('useTableState', () => {
  it('resets page, search, filters, and selection', () => {
    const { result } = renderHook(() => useTableState(25, { status: 'Active' }))
    act(() => {
      result.current.setPageIndex(3)
      result.current.setGlobalFilter('Jane')
      result.current.setRowSelection({ '1': true })
    })
    act(() => result.current.reset())
    expect(result.current.pageIndex).toBe(0)
    expect(result.current.globalFilter).toBe('')
    expect(result.current.rowSelection).toEqual({})
    expect(result.current.columnFilters).toEqual({ status: 'Active' })
  })
})
