export function LoadingSpinner({ label = 'Loading' }: { label?: string }) {
  return <div className="spinner" role="status" aria-live="polite">{label}</div>
}