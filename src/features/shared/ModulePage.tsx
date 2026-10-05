import { lazy, Suspense, useMemo, useState, type FormEvent } from 'react'
import { ArrowUpRight, ClipboardList, Download, Plus, Printer, Search } from 'lucide-react'
import { toast } from 'sonner'
import { navigateTo } from '@/app/router/navigation'
import ModuleDataTable from './components/ModuleDataTable'
import ModuleStats from './components/ModuleStats'
import { moduleSeeds, type ModuleRow } from './data/moduleData'
import ShiftSchedule from '@/features/shifts/components/ShiftSchedule'
import DepartmentDistribution from '@/features/departments/components/DepartmentDistribution'
import DesignationOverview from '@/features/designations/components/DesignationOverview'
import DepartmentDesignationAnalysis from '@/features/designations/components/DepartmentDesignationAnalysis'
import DesignationManagement from '@/features/designations/components/DesignationManagement'
import { sanitizeText } from '@/utils/sanitize-text'
import { buildCsv } from '@/utils/csv'
import LeaveBalanceRadials from '@/features/attendance/components/LeaveBalanceRadials'
import AttendanceCalendar from '@/features/attendance/components/AttendanceCalendar'
import AttendanceClockWidget from '@/features/attendance/components/AttendanceClockWidget'

const labels: Record<string, string> = {
  attendance: 'Attendance',
  leave: 'Leave requests',
  shifts: 'Shift management',
  departments: 'Departments',
  designations: 'Designations',
  payroll: 'Payroll',
  settings: 'Settings',
}

const analyticsModules = new Set(['attendance', 'payroll'])
const ModuleAnalytics = lazy(() => import('./components/ModuleAnalytics'))
const DesignationDistribution = lazy(
  () => import('@/features/designations/components/DesignationDistribution'),
)
const AttendanceInsights = lazy(() => import('@/features/attendance/components/AttendanceInsights'))

export default function ModulePage({ module, subroute }: { module: string; subroute?: string }) {
  const title = labels[module] ?? module
  const [rows, setRows] = useState<ModuleRow[]>(() => {
    try {
      return (
        JSON.parse(localStorage.getItem(`hrm-${module}`) || 'null') || moduleSeeds[module] || []
      )
    } catch {
      return moduleSeeds[module] || []
    }
  })
  const routeId =
    subroute === 'edit' ? window.location.pathname.split('/').filter(Boolean).at(-2) : undefined
  const initialEdit = routeId ? (rows.find((row) => row.id === routeId) ?? null) : null
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const [showForm, setShowForm] = useState(
    subroute === 'create' || subroute === 'apply' || Boolean(initialEdit),
  )
  const [editingRow, setEditingRow] = useState<ModuleRow | null>(initialEdit)
  const [viewingRow, setViewingRow] = useState<ModuleRow | null>(null)
  const [payslipRow, setPayslipRow] = useState<ModuleRow | null>(null)
  const [name, setName] = useState(initialEdit?.name ?? '')
  const [detail, setDetail] = useState(initialEdit?.department ?? '')
  const [reason, setReason] = useState(initialEdit?.detail ?? '')
  const filtered = useMemo(
    () =>
      rows.filter((row) => {
        const matchesQuery = `${row.name} ${row.id} ${row.department} ${row.detail}`
          .toLowerCase()
          .includes(query.toLowerCase())
        const isPaid =
          module === 'payroll' &&
          filter === 'Paid' &&
          ['Processed', 'Paid', 'Approved'].includes(row.status)
        return matchesQuery && (filter === 'All' || row.status === filter || isPaid)
      }),
    [rows, query, filter, module],
  )

  const save = (next: ModuleRow[]) => {
    setRows(next)
    localStorage.setItem(`hrm-${module}`, JSON.stringify(next))
  }

  const start = () => {
    if (module === 'employees') navigateTo('/app/employees/create')
    else if (module === 'leave') navigateTo('/app/leave/apply')
    else {
      if (module === 'designations') {
        setEditingRow(null)
        setName('')
        setDetail('')
        setReason('')
      }
      setShowForm(true)
    }
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name.trim()) {
      toast.error('Please enter a name')
      return
    }
    const record: ModuleRow = {
      id: `${module.slice(0, 2).toUpperCase()}-${Date.now().toString().slice(-4)}`,
      name: sanitizeText(name),
      department: sanitizeText(detail) || 'General',
      detail: sanitizeText(reason) || 'New record',
      date: new Date().toLocaleDateString(),
      status: module === 'leave' ? 'Pending' : module === 'attendance' ? 'Present' : 'Active',
    }
    if (editingRow) {
      save(
        rows.map((row) =>
          row.id === editingRow.id
            ? {
                ...editingRow,
                name: record.name,
                department: record.department,
                detail: record.detail,
              }
            : row,
        ),
      )
      setShowForm(false)
      setEditingRow(null)
      setName('')
      setDetail('')
      setReason('')
      toast.success(`${title.slice(0, -1)} updated successfully`)
      return
    }
    save([record, ...rows])
    setShowForm(false)
    setName('')
    setDetail('')
    setReason('')
    toast.success(`${title} saved successfully`)
  }

  const action = (row: ModuleRow, actionType: 'approve' | 'reject' | 'delete') => {
    if (actionType === 'delete') {
      save(rows.filter((item) => item.id !== row.id))
      toast.success('Record deleted')
      return
    }
    const nextStatus = actionType === 'approve' ? 'Approved' : 'Rejected'
    save(rows.map((item) => (item.id === row.id ? { ...item, status: nextStatus } : item)))
    toast.success(
      module === 'payroll' && actionType === 'approve'
        ? 'Payment marked as paid'
        : `Request ${actionType === 'approve' ? 'approved' : 'rejected'}`,
    )
  }

  const editDesignation = (row: ModuleRow) => {
    setEditingRow(row)
    setName(row.name)
    setDetail(row.department)
    setReason(row.detail)
    setShowForm(true)
  }

  const editRecord = (row: ModuleRow) => {
    setEditingRow(row)
    setName(row.name)
    setDetail(row.department)
    setReason(row.detail)
    setShowForm(true)
  }

  const toggleDesignationStatus = (row: ModuleRow) => {
    const status = row.status === 'Active' ? 'Inactive' : 'Active'
    save(rows.map((item) => (item.id === row.id ? { ...item, status } : item)))
    toast.success(`${row.name} ${status === 'Active' ? 'activated' : 'deactivated'}.`)
  }

  const processPendingPayroll = () => {
    const pendingCount = rows.filter((row) => row.status === 'Pending').length
    if (!pendingCount) {
      toast.info('There are no pending payroll records to process.')
      return
    }
    save(rows.map((row) => (row.status === 'Pending' ? { ...row, status: 'Processed' } : row)))
    toast.success(`${pendingCount} payroll record${pendingCount === 1 ? '' : 's'} processed.`)
  }

  const exportRows = () => {
    const csv = buildCsv(
      ['ID', 'Name', 'Department', 'Details', 'Date', 'Status'],
      filtered.map((row) => [row.id, row.name, row.department, row.detail, row.date, row.status]),
    )
    const link = document.createElement('a')
    link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    link.download = `${module}.csv`
    link.click()
    URL.revokeObjectURL(link.href)
    toast.success('Export downloaded')
  }

  if (module === 'settings')
    return (
      <main className="module-page">
        <div className="page-heading">
          <div>
            <p className="eyebrow">PREFERENCES</p>
            <h1 className="app-page-title">Settings</h1>
            <p>Manage your workspace and personal preferences.</p>
          </div>
        </div>
        <SettingsContent />
      </main>
    )

  const description =
    module === 'attendance'
      ? 'Monitor daily attendance, punctuality, and team coverage.'
      : module === 'leave'
        ? 'Review time off requests and balances.'
        : module === 'shifts'
          ? 'Plan team coverage and keep working hours easy to scan.'
          : module === 'departments'
            ? 'Organize teams, managers, and department headcount.'
            : module === 'designations'
              ? 'Manage job titles and the roles represented across teams.'
              : module === 'payroll'
                ? 'Review payroll trends and payment progress for this period.'
                : `Manage your organization's ${title.toLowerCase()}.`
  const listTitle =
    subroute === 'approvals'
      ? 'Requests awaiting approval'
      : subroute === 'reports'
        ? 'Payroll reports'
        : module === 'attendance'
          ? 'Today’s attendance'
          : module === 'payroll'
            ? 'October payroll'
            : module === 'shifts'
              ? 'Shift management'
              : module === 'departments'
                ? 'Department directory'
                : module === 'designations'
                  ? 'Designation directory'
                  : `All ${title.toLowerCase()}`

  return (
    <main className={`module-page module-page--${module}`}>
      <div
        className={`page-heading ${['shifts', 'departments', 'designations'].includes(module) ? `module-heading module-heading--${module}` : ''}`}
      >
        <div>
          <p className="eyebrow">WORKSPACE / {title.toUpperCase()}</p>
          <h1 className="app-page-title">
            {subroute === 'approvals'
              ? 'Leave approvals'
              : subroute === 'correction'
                ? 'Attendance corrections'
                : title}
          </h1>
          <p>{description}</p>
        </div>
        <div className="heading-actions">
          {module === 'attendance' && (
            <button className="button" onClick={() => setShowForm(true)}>
              <Plus size={15} /> Mark attendance
            </button>
          )}
          {module === 'leave' && (
            <button className="button" onClick={start}>
              <Plus size={15} /> Apply for leave
            </button>
          )}
          {module === 'payroll' && (
            <button className="button primary" onClick={processPendingPayroll}>
              <ClipboardList size={15} /> Process pending
            </button>
          )}
          {['shifts', 'departments', 'designations'].includes(module) && (
            <button className="button primary" onClick={start}>
              <Plus size={15} />{' '}
              {module === 'designations'
                ? 'Create Designation'
                : module === 'departments'
                  ? 'Add Department'
                  : 'Add Shift'}
            </button>
          )}
        </div>
      </div>

      <ModuleStats module={module} rows={rows} />
      {module === 'shifts' && <ShiftSchedule rows={rows} />}
      {module === 'departments' && <DepartmentDistribution rows={rows} />}
      {module === 'designations' && (
        <>
          <div className="designation-overview-grid">
            <DesignationOverview rows={rows} />
            <Suspense
              fallback={
                <section className="panel chart-loading">Loading designation distribution…</section>
              }
            >
              <DesignationDistribution rows={rows} />
            </Suspense>
          </div>
          <DepartmentDesignationAnalysis rows={rows} />
        </>
      )}
      {module === 'attendance' && (
        <>
          <AttendanceClockWidget />
          <LeaveBalanceRadials />
          <div className="attendance-insights-layout">
            <AttendanceCalendar rows={rows} />
            <Suspense
              fallback={
                <section className="panel chart-loading">Loading attendance insights…</section>
              }
            >
              <AttendanceInsights rows={rows} />
            </Suspense>
          </div>
        </>
      )}
      {analyticsModules.has(module) && (
        <Suspense
          fallback={<section className="panel chart-loading">Loading module insights…</section>}
        >
          <ModuleAnalytics module={module as 'attendance' | 'payroll'} />
        </Suspense>
      )}

      {module === 'designations' ? (
        <DesignationManagement
          rows={filtered}
          total={rows.length}
          query={query}
          filter={filter}
          onQueryChange={setQuery}
          onFilterChange={setFilter}
          onExport={exportRows}
          onAction={action}
          onView={setViewingRow}
          onEdit={editDesignation}
          onToggleStatus={toggleDesignationStatus}
        />
      ) : (
        <section className="panel data-panel">
          <div className="panel-head">
            <div>
              {['shifts', 'departments', 'designations'].includes(module) && (
                <span className="module-panel-kicker">WORKSPACE DIRECTORY</span>
              )}
              <h2>{listTitle}</h2>
              <span>{filtered.length} records</span>
            </div>
            <div className="table-tools">
              <label className="table-search">
                <Search size={15} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={`Search ${title.toLowerCase()}...`}
                  aria-label={`Search ${title.toLowerCase()}`}
                />
              </label>
              <select
                aria-label="Filter by status"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
              >
                <option>All</option>
                {[
                  'Active',
                  'Pending',
                  'Approved',
                  'Rejected',
                  'Present',
                  'Absent',
                  'Late',
                  'On Leave',
                  'Processed',
                  'Paid',
                ].map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
              <button
                className="icon-button"
                title="Export CSV"
                aria-label="Export CSV"
                onClick={exportRows}
              >
                <Download size={16} />
              </button>
            </div>
          </div>
          <div className="table-scroll">
            <ModuleDataTable
              module={module}
              rows={filtered}
              onAction={action}
              onView={module === 'payroll' ? setPayslipRow : undefined}
              onEdit={editRecord}
            />
            {!filtered.length && (
              <div className="empty-state">
                <div className="empty-icon">
                  <ClipboardList size={22} />
                </div>
                <b>No records found</b>
                <span>Try adjusting your search or add a new record.</span>
              </div>
            )}
          </div>
          <div className="table-footer">
            <span>
              Showing {filtered.length} of {rows.length} records
            </span>
            <div>
              <button disabled>Previous</button>
              <button className="current-page">1</button>
              <button disabled>Next</button>
            </div>
          </div>
        </section>
      )}

      {showForm && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowForm(false)
              setEditingRow(null)
            }
          }}
        >
          <form className="form-modal" onSubmit={submit}>
            <button
              type="button"
              className="modal-close"
              onClick={() => {
                setShowForm(false)
                setEditingRow(null)
              }}
              aria-label="Close"
            >
              ×
            </button>
            <p className="eyebrow">{editingRow ? 'UPDATE RECORD' : 'NEW RECORD'}</p>
            <h2>
              {editingRow
                ? `Edit ${module === 'shifts' ? 'shift' : module === 'departments' ? 'department' : module === 'designations' ? 'designation' : title.slice(0, -1)}`
                : module === 'leave'
                  ? 'Apply for leave'
                  : module === 'attendance'
                    ? 'Mark attendance'
                    : `Create ${module === 'shifts' ? 'shift' : module === 'departments' ? 'department' : module === 'designations' ? 'designation' : title.slice(0, -1)}`}
            </h2>
            <label>
              {module === 'shifts'
                ? 'Shift name'
                : module === 'departments'
                  ? 'Department name'
                  : module === 'designations'
                    ? 'Designation title'
                    : 'Name / employee'}
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={
                  module === 'designations' ? 'e.g. Senior Software Engineer' : 'Enter a name'
                }
              />
            </label>
            <label>
              {module === 'attendance'
                ? 'Department'
                : module === 'departments'
                  ? 'Department manager'
                  : module === 'shifts'
                    ? 'Shift hours'
                    : 'Department'}
              <input
                value={detail}
                onChange={(event) => setDetail(event.target.value)}
                placeholder="Enter details"
              />
            </label>
            <label>
              {module === 'attendance'
                ? 'Check-in / check-out'
                : module === 'departments'
                  ? 'Location'
                  : module === 'shifts'
                    ? 'Breaks and work days'
                    : module === 'designations'
                      ? 'Level and details'
                      : 'Details'}
              <textarea
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                placeholder="Add notes"
              />
            </label>
            <div className="modal-actions">
              <button
                type="button"
                className="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingRow(null)
                }}
              >
                Cancel
              </button>
              <button className="button primary" type="submit">
                {editingRow ? 'Save changes' : 'Save record'}
              </button>
            </div>
          </form>
        </div>
      )}
      {viewingRow && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => event.target === event.currentTarget && setViewingRow(null)}
        >
          <section
            className="designation-view-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="designation-view-title"
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setViewingRow(null)}
              aria-label="Close designation details"
            >
              ×
            </button>
            <span className="designation-view-icon">
              <ArrowUpRight size={18} />
            </span>
            <p className="eyebrow">DESIGNATION DETAILS</p>
            <h2 id="designation-view-title">{viewingRow.name}</h2>
            <dl>
              <div>
                <dt>Department</dt>
                <dd>{viewingRow.department}</dd>
              </div>
              <div>
                <dt>Level and team size</dt>
                <dd>{viewingRow.detail}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>
                  <span className={`status-pill status-${viewingRow.status.toLowerCase()}`}>
                    <i />
                    {viewingRow.status}
                  </span>
                </dd>
              </div>
              <div>
                <dt>Created</dt>
                <dd>{viewingRow.date}</dd>
              </div>
            </dl>
            <div className="modal-actions">
              <button
                type="button"
                className="button"
                onClick={() => {
                  setViewingRow(null)
                  editDesignation(viewingRow)
                }}
              >
                Edit designation
              </button>
              <button type="button" className="button primary" onClick={() => setViewingRow(null)}>
                Done
              </button>
            </div>
          </section>
        </div>
      )}
      {payslipRow && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => event.target === event.currentTarget && setPayslipRow(null)}
        >
          <section
            className="payslip-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="payslip-title"
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setPayslipRow(null)}
              aria-label="Close payslip"
            >
              ×
            </button>
            <span className="eyebrow">PAYROLL · {payslipRow.date}</span>
            <h2 id="payslip-title">Employee payslip</h2>
            <dl>
              <div>
                <dt>Employee</dt>
                <dd>{payslipRow.name}</dd>
              </div>
              <div>
                <dt>Department</dt>
                <dd>{payslipRow.department}</dd>
              </div>
              <div>
                <dt>Gross pay</dt>
                <dd>{payslipRow.detail}</dd>
              </div>
              <div>
                <dt>Payment status</dt>
                <dd>{payslipRow.status}</dd>
              </div>
            </dl>
            <p className="payslip-demo-note">
              Demo payslip based on the payroll record shown in this workspace.
            </p>
            <div className="modal-actions">
              <button type="button" className="button" onClick={() => setPayslipRow(null)}>
                Close
              </button>
              <button type="button" className="button primary" onClick={() => window.print()}>
                <Printer size={15} /> Print payslip
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}

const defaultRolePermissions: Record<string, boolean> = {
  'HR Administrator:Employees:View': true,
  'HR Administrator:Employees:Edit': true,
  'HR Administrator:Leave:Approve': true,
  'HR Administrator:Payroll:Manage': true,
  'Manager:Employees:View': true,
  'Manager:Leave:Approve': true,
  'Employee:Employees:View': true,
}
type AuditEntry = { time: string; actor: string; action: string; scope: string }
const sampleAudit: AuditEntry[] = [
  {
    time: '10:30 AM',
    actor: 'HR Administrator',
    action: 'Updated employee directory settings',
    scope: 'Employees',
  },
  {
    time: '09:45 AM',
    actor: 'HR Administrator',
    action: 'Approved a leave request',
    scope: 'Leave',
  },
  {
    time: 'Yesterday',
    actor: 'Manager',
    action: 'Reviewed attendance records',
    scope: 'Attendance',
  },
]

function readSettingsRecord<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback
  } catch {
    return fallback
  }
}

function SettingsContent() {
  const [tab, setTab] = useState('General')
  const [saved, setSaved] = useState(false)
  const [permissions, setPermissions] = useState<Record<string, boolean>>(() =>
    readSettingsRecord('hrm-demo-role-permissions', defaultRolePermissions),
  )
  const [audit, setAudit] = useState<AuditEntry[]>(() =>
    readSettingsRecord('hrm-demo-audit-log', sampleAudit),
  )
  const sections = [
    'General',
    'Profile',
    'Notifications',
    'Appearance',
    'Security',
    'Roles & Permissions',
    'Audit Log',
  ]
  const fields =
    tab === 'General'
      ? ['Company name', 'Company email', 'Phone number', 'Address', 'Timezone']
      : tab === 'Profile'
        ? ['Full name', 'Email address', 'Phone number']
        : tab === 'Notifications'
          ? [
              'Email notifications',
              'Leave notifications',
              'Attendance notifications',
              'Payroll notifications',
            ]
          : tab === 'Appearance'
            ? ['Theme', 'Compact mode', 'Sidebar behavior']
            : tab === 'Security'
              ? ['Password', 'Two-factor authentication', 'Active sessions']
              : ['Admin role', 'HR role', 'Manager role', 'Employee role']

  const roles = ['HR Administrator', 'Manager', 'Employee']
  const modules = ['Employees', 'Leave', 'Payroll']
  const actions = ['View', 'Edit', 'Approve', 'Manage']
  const saveDemoPermissions = () => {
    localStorage.setItem('hrm-demo-role-permissions', JSON.stringify(permissions))
    const nextAudit = [
      {
        time: new Date().toLocaleString(),
        actor: 'HR Administrator (demo)',
        action: 'Updated demo role permissions',
        scope: 'Settings',
      },
      ...audit,
    ]
    localStorage.setItem('hrm-demo-audit-log', JSON.stringify(nextAudit))
    setAudit(nextAudit)
    toast.success('Demo permissions saved in this browser.')
  }

  return (
    <div className="settings-layout module-settings-layout">
      <nav className="settings-nav" aria-label="Settings sections">
        {sections.map((section) => (
          <button
            type="button"
            className={tab === section ? 'selected' : ''}
            key={section}
            onClick={() => {
              setTab(section)
              setSaved(false)
            }}
          >
            {section}
            <ArrowUpRight size={14} />
          </button>
        ))}
      </nav>
      {tab === 'Roles & Permissions' ? (
        <section className="panel settings-form settings-rbac-panel">
          <div className="settings-section-heading">
            <div>
              <span className="eyebrow">ACCESS CONTROL</span>
              <h2>Role-permission matrix</h2>
              <p>Demo role settings for workspace access.</p>
            </div>
          </div>
          <div className="settings-rbac-scroll">
            <table className="hr-table settings-rbac-table">
              <thead>
                <tr>
                  <th>Role / module</th>
                  {actions.map((action) => (
                    <th key={action}>{action}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roles.flatMap((role) =>
                  modules.map((moduleName) => (
                    <tr key={`${role}-${moduleName}`}>
                      <th>
                        {role}
                        <small>{moduleName}</small>
                      </th>
                      {actions.map((actionName) => {
                        const key = `${role}:${moduleName}:${actionName}`
                        return (
                          <td key={key}>
                            <input
                              aria-label={`${role} ${moduleName} ${actionName}`}
                              type="checkbox"
                              checked={Boolean(permissions[key])}
                              onChange={(event) =>
                                setPermissions((current) => ({
                                  ...current,
                                  [key]: event.target.checked,
                                }))
                              }
                            />
                          </td>
                        )
                      })}
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>
          <p className="settings-demo-note">
            Permission settings persist in browser storage for this demo; route authorization
            remains based on the signed-in demo role.
          </p>
          <button type="button" className="button primary" onClick={saveDemoPermissions}>
            Save permissions
          </button>
        </section>
      ) : tab === 'Audit Log' ? (
        <section className="panel settings-form">
          <div className="settings-section-heading">
            <div>
              <span className="eyebrow">WORKSPACE ACTIVITY</span>
              <h2>Audit log</h2>
              <p>Sample and settings activity stored in this browser.</p>
            </div>
          </div>
          <div className="settings-audit-list">
            {audit.map((entry) => (
              <article key={`${entry.time}-${entry.action}`}>
                <time>{entry.time}</time>
                <div>
                  <strong>{entry.action}</strong>
                  <small>
                    {entry.actor} · {entry.scope}
                  </small>
                </div>
              </article>
            ))}
          </div>
          <p className="settings-demo-note">
            This local demo feed is not a compliance audit trail.
          </p>
        </section>
      ) : (
        <form
          className="panel settings-form"
          onSubmit={(event) => {
            event.preventDefault()
            setSaved(true)
            toast.success('Settings updated successfully')
          }}
        >
          <div className="settings-section-heading">
            <div>
              <span className="eyebrow">WORKSPACE PREFERENCES</span>
              <h2>{tab} settings</h2>
              <p>Update your {tab.toLowerCase()} preferences for Quixotic HR.</p>
            </div>
          </div>
          <div className="settings-field-list">
            {fields.map((field, index) => (
              <label className="setting-field" key={field}>
                <span>{field}</span>
                {tab === 'Notifications' ? (
                  <input type="checkbox" defaultChecked={index < 3} />
                ) : tab === 'Appearance' && index === 0 ? (
                  <select defaultValue="Light" aria-label={field}>
                    <option>Light</option>
                    <option>System</option>
                  </select>
                ) : tab === 'Appearance' && index === 1 ? (
                  <input type="checkbox" aria-label={field} />
                ) : tab === 'Appearance' && index === 2 ? (
                  <select defaultValue="Expanded" aria-label={field}>
                    <option>Expanded</option>
                    <option>Collapsed</option>
                  </select>
                ) : tab === 'General' && index === 4 ? (
                  <select defaultValue="Asia/Kolkata" aria-label={field}>
                    <option>Asia/Kolkata</option>
                    <option>UTC</option>
                    <option>America/New_York</option>
                  </select>
                ) : (
                  <input
                    type={field.toLowerCase().includes('email') ? 'email' : 'text'}
                    placeholder={`Enter ${field.toLowerCase()}`}
                  />
                )}
              </label>
            ))}
          </div>
          <button className="button primary" type="submit">
            {saved ? 'Saved' : 'Save changes'}
          </button>
        </form>
      )}
    </div>
  )
}
