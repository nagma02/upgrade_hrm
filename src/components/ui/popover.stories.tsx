import type { Meta, StoryObj } from '@storybook/react'
import { Popover } from './popover'

const meta = {
  title: 'UI/Popover',
  render: () => (
    <Popover trigger={<button className="button">More info</button>}>
      <p>Additional employee information.</p>
    </Popover>
  ),
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
