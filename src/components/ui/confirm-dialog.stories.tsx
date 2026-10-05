import type { Meta, StoryObj } from '@storybook/react'
import { ConfirmDialog } from './confirm-dialog'

const meta = {
  title: 'UI/ConfirmDialog',
  render: () => (
    <ConfirmDialog open title="Delete employee?" message="This action cannot be undone." />
  ),
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
