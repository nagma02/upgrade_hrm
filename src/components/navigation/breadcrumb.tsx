export function Breadcrumb() {
  const pathname = window.location.pathname
  const segments = pathname.split('/').filter(Boolean)

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <a
        href="/login"
        onClick={(event) => {
          event.preventDefault()
          window.history.pushState({}, '', '/login')
          window.dispatchEvent(new PopStateEvent('popstate'))
        }}
      >
        Home
      </a>
      {segments.length > 0 ? <span aria-hidden="true">/</span> : null}
      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join('/')}`
        const label = segment.replace(/-/g, ' ')

        return (
          <span key={href} className="breadcrumb__item">
            <a
              href={href}
              onClick={(event) => {
                event.preventDefault()
                window.history.pushState({}, '', href)
                window.dispatchEvent(new PopStateEvent('popstate'))
              }}
            >
              {label}
            </a>
            {index < segments.length - 1 ? <span aria-hidden="true">/</span> : null}
          </span>
        )
      })}
    </nav>
  )
}