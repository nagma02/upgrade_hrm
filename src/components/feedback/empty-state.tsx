export function EmptyState({ title = 'Nothing to show', message }: { title?: string; message?: string }) {
  return (
    <div className="state state--empty">
      <strong>{title}</strong>
      {message ? <p>{message}</p> : null}
    </div>
  )
}