import type { Meta, StoryObj } from '@storybook/react'
import { FileUpload } from './file-upload'

const meta = {
  title: 'UI/FileUpload',
  render: () => <FileUpload type="file" aria-label="Upload employee document" />,
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
