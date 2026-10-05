import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './tooltip'

const meta = {
  title: 'UI/Tooltip',
  render: () => (
    <Tooltip label="Employee ID">
      <button className="button">Hover for details</button>
    </Tooltip>
  ),
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
