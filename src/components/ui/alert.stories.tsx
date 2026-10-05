import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from './alert'

const meta = {
  title: 'UI/Alert',
  render: () => <Alert title="Action completed">Your changes have been saved.</Alert>,
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
