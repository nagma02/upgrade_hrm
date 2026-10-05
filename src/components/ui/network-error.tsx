import { Button } from './button'

export function NetworkError({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="state state--error" role="alert">
      <strong>Network error</strong>
      <p>Please check your connection and try again.</p>
      {onRetry ? <Button onClick={onRetry}>Retry</Button> : null}
    </div>
  )
}