import { APP_STORAGE_KEYS } from '@/constants/app'
import { removeStorageValue } from '@/utils/storage'
import type { AuthSession, User } from '@/types/auth'

export function getStoredAuthSession() {
  const stored = window.localStorage.getItem(APP_STORAGE_KEYS.authSession)
    ?? window.sessionStorage.getItem(APP_STORAGE_KEYS.authSession)
  if (!stored) return null

  try {
    const session = JSON.parse(stored) as AuthSession
    if (
      !session.user?.email ||
      session.user.id === 'demo-user' ||
      (session.expiresAt && new Date(session.expiresAt).getTime() <= Date.now())
    ) {
      clearAuthSession()
      return null
    }
    return session
  } catch {
    clearAuthSession()
    return null
  }
}

export function persistAuthSession(session: AuthSession, rememberMe: boolean) {
  const destination = rememberMe ? window.localStorage : window.sessionStorage
  const other = rememberMe ? window.sessionStorage : window.localStorage
  destination.setItem(APP_STORAGE_KEYS.authSession, JSON.stringify(session))
  other.removeItem(APP_STORAGE_KEYS.authSession)
}

export function clearAuthSession() {
  removeStorageValue(APP_STORAGE_KEYS.authSession)
  window.sessionStorage.removeItem(APP_STORAGE_KEYS.authSession)
}

function displayNameFromEmail(email: string) {
  const localPart = email.split('@')[0] ?? ''
  const words = localPart.split(/[._+-]+/).filter(Boolean)
  return words.map((word) => word.charAt(0).toLocaleUpperCase() + word.slice(1)).join(' ') || email
}

export function createDemoSession(credentials: { email: string; password: string; rememberMe: boolean }) {
  const email = credentials.email.trim().toLocaleLowerCase()
  const user: User = {
    id: `demo-${email}`,
    name: displayNameFromEmail(email),
    email,
    role: 'HR Administrator',
    permissions: [
      'app.view', 'dashboard.view', 'employee.view', 'employee.manage', 'attendance.view',
      'leave.view', 'leave.approve', 'shift.view', 'department.view', 'designation.view',
      'payroll.view', 'payroll.process', 'settings.view', 'settings.manage',
    ],
  }

  const session: AuthSession = {
    user,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
  }

  persistAuthSession(session, credentials.rememberMe)

  return session
}
