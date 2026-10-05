import type { Meta, StoryObj } from '@storybook/react'
import { PageLoader } from './page-loader'

const meta = { title: 'UI/PageLoader', render: () => <PageLoader /> } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
