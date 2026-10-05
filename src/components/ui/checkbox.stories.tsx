import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './checkbox'

const meta = {
  title: 'UI/Checkbox',
  render: () => (
    <label>
      <Checkbox defaultChecked /> Remember this filter
    </label>
  ),
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
