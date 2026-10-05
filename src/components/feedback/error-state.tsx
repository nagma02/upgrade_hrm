export function ErrorState({ title = 'Something went wrong', message }: { title?: string; message?: string }) {
  return (
    <div className="state state--error" role="alert">
      <strong>{title}</strong>
      {message ? <p>{message}</p> : null}
    </div>
  )
}