import type { Meta, StoryObj } from '@storybook/react'
import { Accordion } from './accordion'

const meta = {
  title: 'UI/Accordion',
  render: () => <Accordion title="Employee details">Role and department information.</Accordion>,
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
