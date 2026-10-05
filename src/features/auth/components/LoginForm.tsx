import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { authSchema } from '@/schemas/auth.schema'
import { useAuth } from '@/app/providers/use-auth'

const loginSchema = authSchema.extend({
  email: authSchema.shape.email.min(1, 'Email is required.').email('Enter a valid email address.'),
  password: authSchema.shape.password.min(1, 'Password is required.'),
})
type LoginValues = { email: string; password: string; rememberMe: boolean }

export function LoginForm() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  })

  const onSubmit = handleSubmit((values) => {
    setAuthError('')
    try {
      signIn(values)
      navigate('/app/dashboard', { replace: true })
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Unable to sign in. Please try again.')
    }
  })

  return (
    <section className="login-form-panel" aria-labelledby="login-title">
      <div className="login-form-content">
        <div className="login-form-brand">
          <span className="login-form-mark">H</span>
          <span>
            HRM<small>Secure workspace access</small>
          </span>
        </div>
        <div className="auth-screen__eyebrow">Welcome back</div>
        <h2 id="login-title" className="auth-screen__title">
          Sign in to your account
        </h2>
        <p className="auth-screen__description">
          Enter your credentials to access your HRM workspace.
        </p>

        <form className="login-form" onSubmit={onSubmit} noValidate>
          <div className="login-field">
            <label htmlFor="login-email">Work email</label>
            <div className={`login-input-wrap ${errors.email ? 'has-error' : ''}`}>
              <Mail size={17} aria-hidden="true" />
              <input
                id="login-email"
                type="email"
                autoComplete="username"
                placeholder="you@company.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'login-email-error' : undefined}
                {...register('email')}
              />
            </div>
            {errors.email && (
              <span id="login-email-error" className="field-error" role="alert">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="login-field">
            <label htmlFor="login-password">Password</label>
            <div className={`login-input-wrap ${errors.password ? 'has-error' : ''}`}>
              <LockKeyhole size={17} aria-hidden="true" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'login-password-error' : undefined}
                {...register('password')}
              />
              <button
                className="password-toggle"
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((visible) => !visible)}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            {errors.password && (
              <span id="login-password-error" className="field-error" role="alert">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="login-options">
            <label className="remember-option">
              <input type="checkbox" {...register('rememberMe')} />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          <button
            type="submit"
            className="button button--primary login-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="login-spinner" /> Signing in…
              </>
            ) : (
              <>
                Sign in <ArrowRight size={16} />
              </>
            )}
          </button>
          {authError && (
            <p className="login-error" role="alert">
              <ShieldCheck size={16} />
              {authError}
            </p>
          )}
        </form>
        <div className="demo-mode-notice">
          <ShieldCheck size={15} />
          <span>
            <strong>Demo Mode</strong> — Use any valid email and password to continue.
          </span>
        </div>
        <div className="login-security-note">
          <ShieldCheck size={14} /> Your account details are handled securely.
        </div>
      </div>
    </section>
  )
}
