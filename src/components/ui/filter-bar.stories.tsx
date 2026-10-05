import type { Meta, StoryObj } from '@storybook/react'
import { FilterBar } from './filter-bar'

const meta = {
  title: 'UI/FilterBar',
  render: () => (
    <FilterBar>
      <select aria-label="Department">
        <option>All departments</option>
        <option>Engineering</option>
      </select>
    </FilterBar>
  ),
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
