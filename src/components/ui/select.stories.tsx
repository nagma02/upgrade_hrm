import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './select'

const meta = {
  title: 'UI/Select',
  render: () => (
    <Select aria-label="Department">
      <option>All departments</option>
      <option>Engineering</option>
    </Select>
  ),
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
