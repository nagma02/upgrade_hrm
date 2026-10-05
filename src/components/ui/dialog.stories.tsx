import type { Meta, StoryObj } from '@storybook/react'
import { Dialog } from './dialog'

const meta = {
  title: 'UI/Dialog',
  render: () => (
    <Dialog open title="Employee details">
      Review employee information.
    </Dialog>
  ),
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
