import { Dialog } from './dialog'

export function ConfirmDialog({ open, title, message }: { open: boolean; title: string; message: string }) {
  return <Dialog open={open} title={title}>{message}</Dialog>
}