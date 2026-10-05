import type { Meta, StoryObj } from '@storybook/react'
import { NetworkError } from './network-error'

const meta = {
  title: 'UI/NetworkError',
  render: () => <NetworkError onRetry={() => undefined} />,
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
