import type { Meta, StoryObj } from '@storybook/react'
import { PermissionDenied } from './permission-denied'

const meta = {
  title: 'UI/PermissionDenied',
  render: () => <PermissionDenied onGoBack={() => undefined} />,
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
