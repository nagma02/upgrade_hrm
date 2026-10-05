import { Button } from './button'

export function PermissionDenied({ onGoBack }: { onGoBack?: () => void }) {
  return (
    <div className="state state--error" role="alert">
      <strong>Permission denied</strong>
      <p>You do not have permission to view this content.</p>
      {onGoBack ? <Button onClick={onGoBack}>Go back</Button> : null}
    </div>
  )
}