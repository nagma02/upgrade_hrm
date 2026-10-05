import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from './date-picker'

const meta = {
  title: 'UI/DatePicker',
  render: () => <DatePicker type="date" aria-label="Choose date" />,
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
