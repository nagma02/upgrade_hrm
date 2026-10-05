import { useMemo, useState, type ReactNode } from 'react'
import {
  columnFilteringFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  tableFeatures,
  useTable,
  type ColumnFiltersState,
  type PaginationState,
  type RowSelectionState,
} from '@tanstack/react-table'
import { buildCsv } from '@/utils/csv'

export type DataTableColumn<TItem> = {
  key: string
  header: ReactNode
  cell: (item: TItem) => ReactNode
}

const features = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
})

export function DataTable<TItem extends object>({
  items,
  columns,
  emptyMessage = 'No rows found.',
  isLoading = false,
  pageSize: initialPageSize = 10,
  getRowId,
}: {
  items: TItem[]
  columns: Array<DataTableColumn<TItem>>
  emptyMessage?: string
  isLoading?: boolean
  pageSize?: number
  getRowId?: (item: TItem, index: number) => string
}) {
  const [globalSearch, setGlobalSearch] = useState('')
  const [filterColumn, setFilterColumn] = useState('')
  const [columnFilter, setColumnFilter] = useState('')
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  })
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const filterKeys = useMemo(() => (items[0] ? Object.keys(items[0] as object) : []), [items])
  const columnFilters: ColumnFiltersState =
    filterColumn && columnFilter ? [{ id: filterColumn, value: columnFilter }] : []
  const tableColumns = useMemo(() => {
    const helper = createColumnHelper<typeof features, TItem>()
    return helper.columns(
      columns.map((column) =>
        helper.accessor((item) => (item as Record<string, unknown>)[column.key] as string, {
          id: column.key,
          header: () => column.header,
          cell: ({ row }) => column.cell(row.original),
        }),
      ),
    )
  }, [columns])
  const table = useTable({
    features,
    data: items,
    columns: tableColumns,
    getRowId: (item, index) =>
      getRowId?.(item, index) ?? String((item as { id?: unknown }).id ?? index),
    state: { pagination, rowSelection, globalFilter: globalSearch, columnFilters },
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalSearch,
    globalFilterFn: (row, columnId, filterValue) =>
      String(row.getValue(columnId) ?? '')
        .toLocaleLowerCase()
        .includes(String(filterValue ?? '').toLocaleLowerCase()),
  })
  const filteredItems = table.getFilteredRowModel().rows.map((row) => row.original)

  const exportCsv = () => {
    const keys = filterKeys
    const csv = buildCsv(
      keys,
      filteredItems.map((item) => keys.map((key) => (item as Record<string, unknown>)[key])),
    )
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'table-export.csv'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  if (isLoading)
    return (
      <div className="table-shell" aria-label="Loading records" aria-busy="true">
        <div className="table-skeleton">
          {Array.from({ length: Math.min(initialPageSize, 6) }, (_, row) => (
            <div className="table-skeleton-row" key={row}>
              {columns.map((column) => (
                <span key={column.key} />
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  if (items.length === 0) return <div className="state state--empty">{emptyMessage}</div>

  return (
    <div className="table-component">
      <div className="table-component-tools">
        <label>
          <span className="sr-only">Search all rows</span>
          <input
            value={globalSearch}
            onChange={(event) => {
              table.setGlobalFilter(event.target.value)
              table.firstPage()
            }}
            placeholder="Search all rows…"
          />
        </label>
        <label>
          <span className="sr-only">Filter column</span>
          <select
            value={filterColumn}
            onChange={(event) => {
              setFilterColumn(event.target.value)
              setColumnFilter('')
              table.firstPage()
            }}
          >
            <option value="">All columns</option>
            {filterKeys.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </label>
        {filterColumn && (
          <label>
            <span className="sr-only">Column filter</span>
            <input
              value={columnFilter}
              onChange={(event) => {
                setColumnFilter(event.target.value)
                table.firstPage()
              }}
              placeholder={`Filter ${filterColumn}…`}
            />
          </label>
        )}
        <span className="table-selected-count">{table.getSelectedRowIds().length} selected</span>
        <button type="button" className="button" onClick={exportCsv}>
          Export CSV
        </button>
      </div>
      <div className="table-shell">
        <table className="table">
          <thead>
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                <th>
                  <input
                    type="checkbox"
                    aria-label="Select visible rows"
                    checked={table.getIsAllPageRowsSelected()}
                    onChange={table.getToggleAllPageRowsSelectedHandler()}
                  />
                </th>
                {group.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                <td>
                  <input
                    type="checkbox"
                    aria-label={`Select row ${row.id}`}
                    checked={row.getIsSelected()}
                    onChange={row.getToggleSelectedHandler()}
                  />
                </td>
                {row.getAllCells().map((cell) => (
                  <td key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!filteredItems.length ? (
        <div className="state state--empty">No matching records.</div>
      ) : (
        <div className="table-component-footer">
          <span>
            Showing {Math.min(filteredItems.length, pagination.pageIndex * pagination.pageSize + 1)}
            –{Math.min(filteredItems.length, (pagination.pageIndex + 1) * pagination.pageSize)} of{' '}
            {filteredItems.length}
          </span>
          <div>
            <button
              type="button"
              className="button"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              Previous
            </button>
            <button
              type="button"
              className="button"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
