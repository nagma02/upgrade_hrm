import type { Meta, StoryObj } from '@storybook/react'
import { Tabs } from './tabs'

const meta = {
  title: 'UI/Tabs',
  render: () => (
    <Tabs>
      <button>Overview</button>
      <button>Activity</button>
    </Tabs>
  ),
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
