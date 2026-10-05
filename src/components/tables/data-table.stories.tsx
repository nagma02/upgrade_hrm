import type { Meta, StoryObj } from '@storybook/react'
import { DataTable } from './data-table'

const rows = [
  { id: 'E-1', name: 'Jane Cooper', department: 'Engineering' },
  { id: 'E-2', name: 'Aisha Khan', department: 'HR' },
]
const columns = [
  { key: 'name', header: 'Employee', cell: (row: (typeof rows)[number]) => row.name },
  { key: 'department', header: 'Department', cell: (row: (typeof rows)[number]) => row.department },
]
const meta = {
  title: 'Tables/DataTable',
  render: () => <DataTable items={rows} columns={columns} getRowId={(row) => row.id} />,
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
