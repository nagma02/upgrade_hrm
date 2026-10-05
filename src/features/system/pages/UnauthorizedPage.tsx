import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

function navigateTo(href: string) {
  window.history.pushState({}, '', href)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function UnauthorizedPage() {
  return (
    <div className="system-screen">
      <Card>
        <h1>Unauthorized</h1>
        <p>You do not have access to this screen yet.</p>
        <Button onClick={() => navigateTo('/login')}>Back to login</Button>
      </Card>
    </div>
  )
}