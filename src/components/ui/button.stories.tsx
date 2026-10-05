import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

const meta = {
  title: 'UI/Button',
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  ),
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
