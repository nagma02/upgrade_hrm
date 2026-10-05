import type { Meta, StoryObj } from '@storybook/react'
import { StatusBadge } from './status-badge'

const meta = {
  title: 'UI/StatusBadge',
  render: () => <StatusBadge status="Active" />,
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
