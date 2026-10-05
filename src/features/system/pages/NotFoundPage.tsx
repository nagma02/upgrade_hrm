import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

function navigateTo(href: string) {
  window.history.pushState({}, '', href)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function NotFoundPage() {
  return (
    <div className="system-screen">
      <Card>
        <h1>Page not found</h1>
        <p>The route you requested is not part of the current foundation.</p>
        <Button onClick={() => navigateTo('/login')}>Go to login</Button>
      </Card>
    </div>
  )
}