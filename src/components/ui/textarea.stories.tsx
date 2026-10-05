import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './textarea'

const meta = {
  title: 'UI/Textarea',
  render: () => <Textarea placeholder="Add a note" aria-label="Add a note" />,
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
