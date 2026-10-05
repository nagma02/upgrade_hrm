import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import EmployeesPage from '@/features/employees/pages/EmployeesPage'
import EmployeeCreatePage from '@/features/employees/pages/EmployeeCreatePage'
import EmployeeDetailsPage from '@/features/employees/pages/EmployeeDetailsPage'
import EmployeeEditPage from '@/features/employees/pages/EmployeeEditPage'
import ModulePage from '@/features/shared/ModulePage'
import { ForgotPasswordPage } from '@/features/auth/pages/ForgotPasswordPage'
import LoginPage from '@/features/auth/pages/LoginPage'
import { NotFoundPage } from '@/features/system/pages/NotFoundPage'
import { UnauthorizedPage } from '@/features/system/pages/UnauthorizedPage'
import { GuestRoute } from './guest-route'
import { ProtectedRoute } from './protected-route'
import { PermissionRoute } from './permission-route'
import { LeaveApprovalPage, LeaveApplyPage, LeaveDetailsPage, LeavePage } from '@/features/leave'
import { AttendanceCorrectionPage } from '@/features/attendance/pages/AttendanceCorrectionPage'
import { AttendanceDetailsPage } from '@/features/attendance/pages/AttendanceDetailsPage'
import { PayrollReportsPage } from '@/features/payroll/pages/PayrollReportsPage'

export function RouterApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <GuestRoute>
              <ForgotPasswordPage />
            </GuestRoute>
          }
        />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route path="/app" element={<Navigate to="/app/dashboard" replace />} />
          <Route path="/app/dashboard" element={<DashboardPage />} />
          <Route
            path="/app/employees"
            element={
              <PermissionRoute permission="employee.view">
                <EmployeesPage />
              </PermissionRoute>
            }
          />
          <Route
            path="/app/employees/create"
            element={
              <PermissionRoute permission="employee.manage">
                <EmployeeCreatePage />
              </PermissionRoute>
            }
          />
          <Route
            path="/app/employees/:id/edit"
            element={
              <PermissionRoute permission="employee.manage">
                <EmployeeEditPage />
              </PermissionRoute>
            }
          />
          <Route
            path="/app/employees/:id"
            element={
              <PermissionRoute permission="employee.view">
                <EmployeeDetailsPage />
              </PermissionRoute>
            }
          />
          <Route
            path="/app/attendance/corrections"
            element={
              <PermissionRoute permission="attendance.view">
                <AttendanceCorrectionPage />
              </PermissionRoute>
            }
          />
          <Route
            path="/app/attendance/:id"
            element={
              <PermissionRoute permission="attendance.view">
                <AttendanceDetailsPage />
              </PermissionRoute>
            }
          />
          <Route
            path="/app/attendance"
            element={
              <PermissionRoute permission="attendance.view">
                <ModuleRoute module="attendance" />
              </PermissionRoute>
            }
          />
          <Route
            path="/app/leave/apply"
            element={
              <PermissionRoute permission="leave.view">
                <LeaveApplyPage />
              </PermissionRoute>
            }
          />
          <Route
            path="/app/leave/approvals"
            element={
              <PermissionRoute permission="leave.approve">
                <LeaveApprovalPage />
              </PermissionRoute>
            }
          />
          <Route
            path="/app/leave/:id"
            element={
              <PermissionRoute permission="leave.view">
                <LeaveDetailsPage />
              </PermissionRoute>
            }
          />
          <Route
            path="/app/leave"
            element={
              <PermissionRoute permission="leave.view">
                <LeavePage />
              </PermissionRoute>
            }
          />
          <Route
            path="/app/shifts/*"
            element={
              <PermissionRoute permission="shift.view">
                <ModuleRoute module="shifts" />
              </PermissionRoute>
            }
          />
          <Route
            path="/app/departments/*"
            element={
              <PermissionRoute permission="department.view">
                <ModuleRoute module="departments" />
              </PermissionRoute>
            }
          />
          <Route
            path="/app/designations/*"
            element={
              <PermissionRoute permission="designation.view">
                <ModuleRoute module="designations" />
              </PermissionRoute>
            }
          />
          <Route
            path="/app/payroll/reports"
            element={
              <PermissionRoute permission="payroll.view">
                <PayrollReportsPage />
              </PermissionRoute>
            }
          />
          <Route
            path="/app/payroll/*"
            element={
              <PermissionRoute permission="payroll.view">
                <ModuleRoute module="payroll" />
              </PermissionRoute>
            }
          />
          <Route
            path="/app/settings/*"
            element={
              <PermissionRoute permission="settings.view">
                <ModuleRoute module="settings" />
              </PermissionRoute>
            }
          />
          <Route path="/app/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/app/*" element={<NotFoundPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

function ModuleRoute({ module }: { module: string }) {
  const location = useLocation()
  const segments = location.pathname.split('/').filter(Boolean)
  const subroute =
    segments.at(-1) === 'edit' ? 'edit' : segments.at(-1) === 'create' ? 'create' : segments[2]
  return <ModulePage module={module} subroute={subroute} />
}
