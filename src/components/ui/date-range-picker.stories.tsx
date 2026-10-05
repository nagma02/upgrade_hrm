import type { Meta, StoryObj } from '@storybook/react'
import { DateRangePicker } from './date-range-picker'

const meta = { title: 'UI/DateRangePicker', render: () => <DateRangePicker /> } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
