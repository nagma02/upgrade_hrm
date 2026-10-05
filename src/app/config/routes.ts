import { APP_ROUTE_PATHS } from '@/constants/app'

export const appRoutes = {
  root: APP_ROUTE_PATHS.root,
  login: APP_ROUTE_PATHS.login,
  forgotPassword: APP_ROUTE_PATHS.forgotPassword,
  dashboard: APP_ROUTE_PATHS.dashboard,
  unauthorized: APP_ROUTE_PATHS.unauthorized,
  notFound: APP_ROUTE_PATHS.notFound,
} as const

export const futureModuleRoutes = {
  employees: '/app/employees',
  attendance: '/app/attendance',
  leave: '/app/leave',
  shifts: '/app/shifts',
  departments: '/app/departments',
  designations: '/app/designations',
  payroll: '/app/payroll',
  settings: '/app/settings',
} as const