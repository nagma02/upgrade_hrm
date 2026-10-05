import type { Meta, StoryObj } from '@storybook/react'
import { TimePicker } from './time-picker'

const meta = {
  title: 'UI/TimePicker',
  render: () => <TimePicker type="time" aria-label="Choose time" />,
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
