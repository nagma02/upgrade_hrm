import type { Meta, StoryObj } from '@storybook/react'
import { Combobox } from './combobox'

const meta = {
  title: 'UI/Combobox',
  render: () => <Combobox placeholder="Search employees" />,
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
