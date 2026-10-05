import { useDisclosure } from './use-disclosure'

export function useConfirmDialog() {
  const disclosure = useDisclosure(false)

  return {
    ...disclosure,
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
  }
}