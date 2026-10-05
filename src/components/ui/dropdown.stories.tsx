import type { Meta, StoryObj } from '@storybook/react'
import { Dropdown } from './dropdown'

const meta = {
  title: 'UI/Dropdown',
  render: () => (
    <Dropdown trigger={<button className="button">Options</button>}>
      <button>Edit profile</button>
      <button>View details</button>
    </Dropdown>
  ),
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
