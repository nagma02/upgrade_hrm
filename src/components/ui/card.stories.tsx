import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './card'

const meta = {
  title: 'UI/Card',
  render: () => (
    <Card>
      <h3>Team overview</h3>
      <p>Reusable surface for HR workspace content.</p>
    </Card>
  ),
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
