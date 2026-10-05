import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './switch'

const meta = {
  title: 'UI/Switch',
  render: () => (
    <label>
      <Switch type="checkbox" role="switch" defaultChecked /> Notifications enabled
    </label>
  ),
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
