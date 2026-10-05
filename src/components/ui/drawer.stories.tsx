import type { Meta, StoryObj } from '@storybook/react'
import { Drawer } from './drawer'

const meta = {
  title: 'UI/Drawer',
  render: () => (
    <Drawer open title="Employee profile">
      Contact and employment details.
    </Drawer>
  ),
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
