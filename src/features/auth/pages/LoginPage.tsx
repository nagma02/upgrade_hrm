import { LoginBrandPanel } from '@/features/auth/components/LoginBrandPanel'
import { LoginForm } from '@/features/auth/components/LoginForm'

export default function LoginPage() {
  return (
    <main className="auth-screen">
      <div className="auth-layout">
        <LoginBrandPanel />
        <LoginForm />
      </div>
    </main>
  )
}
