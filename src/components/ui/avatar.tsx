export function Avatar({ initials }: { initials: string }) {
  return <span className="avatar" aria-label={initials}>{initials}</span>
}