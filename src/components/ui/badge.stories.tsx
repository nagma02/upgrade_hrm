import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './badge'

const meta = {
  title: 'UI/Badge',
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Badge tone="success">Active</Badge>
      <Badge tone="warning">Pending</Badge>
    </div>
  ),
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
