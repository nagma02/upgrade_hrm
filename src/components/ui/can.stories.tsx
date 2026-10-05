import type { Meta, StoryObj } from '@storybook/react'
import { AuthProvider } from '@/app/providers/auth-provider'
import { Can } from './can'

const meta = {
  title: 'UI/Can',
  render: () => (
    <AuthProvider>
      <Can permission="dashboard.view" fallback={<span>Permission denied</span>}>
        Dashboard permission granted
      </Can>
    </AuthProvider>
  ),
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
