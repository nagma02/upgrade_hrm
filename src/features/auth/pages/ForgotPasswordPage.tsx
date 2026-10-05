import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

function navigateTo(href: string) {
  window.history.pushState({}, '', href)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function ForgotPasswordPage() {
  return (
    <div className="auth-screen">
      <Card>
        <div className="auth-screen__eyebrow">Password recovery</div>
        <h1 className="auth-screen__title">Forgot password</h1>
        <p className="auth-screen__description">
          The recovery workflow is scaffolded here and will connect to the real API in a later phase.
        </p>
        <Button onClick={() => navigateTo('/login')}>Back to sign in</Button>
      </Card>
    </div>
  )
}