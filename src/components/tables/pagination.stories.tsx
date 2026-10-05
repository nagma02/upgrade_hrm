import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from './pagination'

const meta = {
  title: 'UI/Pagination',
  render: () => (
    <Pagination page={1} pageSize={10} onPrevious={() => undefined} onNext={() => undefined} />
  ),
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
