import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './avatar'

const meta = { title: 'UI/Avatar', render: () => <Avatar initials="NG" /> } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
