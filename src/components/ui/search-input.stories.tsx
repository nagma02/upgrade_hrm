import type { Meta, StoryObj } from '@storybook/react'
import { SearchInput } from './search-input'

const meta = {
  title: 'UI/SearchInput',
  render: () => <SearchInput placeholder="Search by name" aria-label="Search by name" />,
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
