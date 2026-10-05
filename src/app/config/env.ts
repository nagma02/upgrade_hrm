export type AppEnvironment = 'development' | 'staging' | 'production' | 'test'

export const appEnv = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
  name: import.meta.env.VITE_APP_NAME ?? 'HRM | Human Resource Management',
  env: (import.meta.env.VITE_APP_ENV ?? import.meta.env.MODE ?? 'development') as AppEnvironment,
}
