import type { Meta, StoryObj } from '@storybook/react'
import { StatCard } from './stat-card'

const meta = {
  title: 'UI/StatCard',
  render: () => <StatCard label="Total employees" value="248" />,
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
