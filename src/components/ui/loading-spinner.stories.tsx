import type { Meta, StoryObj } from '@storybook/react'
import { LoadingSpinner } from './loading-spinner'

const meta = {
  title: 'UI/LoadingSpinner',
  render: () => <LoadingSpinner label="Loading employees" />,
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
