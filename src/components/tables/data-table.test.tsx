import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DataTable } from './data-table'

const items = [
  { id: '1', employee: 'Jane Cooper', department: 'Engineering' },
  { id: '2', employee: 'Aisha Khan', department: 'People' },
]
const columns = [
  { key: 'employee', header: 'Employee', cell: (row: (typeof items)[number]) => row.employee },
  {
    key: 'department',
    header: 'Department',
    cell: (row: (typeof items)[number]) => row.department,
  },
]

describe('DataTable', () => {
  it('searches row values and selects matching rows', () => {
    render(<DataTable items={items} columns={columns} getRowId={(row) => row.id} />)
    fireEvent.change(screen.getByLabelText('Search all rows'), { target: { value: 'Aisha' } })
    expect(screen.getByText('Aisha Khan')).toBeInTheDocument()
    expect(screen.queryByText('Jane Cooper')).not.toBeInTheDocument()
    fireEvent.click(screen.getByLabelText('Select row 2'))
    expect(screen.getByText('1 selected')).toBeInTheDocument()
  })
})
