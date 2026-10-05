import { futureModuleRoutes } from './routes'

export const primaryNavigation = [
  { label: 'Dashboard', href: '/app/dashboard' },
  { label: 'Employees', href: futureModuleRoutes.employees },
  { label: 'Attendance', href: futureModuleRoutes.attendance },
  { label: 'Leave', href: futureModuleRoutes.leave },
  { label: 'Settings', href: futureModuleRoutes.settings },
] as const