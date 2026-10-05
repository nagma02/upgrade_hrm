import React, { useMemo, useState } from 'react'
import PageContainer from '@/features/shared/PageContainer'
import PageHeader from '@/features/shared/PageHeader'
import { employees } from '../data/employeesData'
import StatusBadge from '@/features/shared/StatusBadge'
import { navigateTo } from '@/app/router/navigation'
import { Download, Plus, Eye, Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { departmentDistribution, kpiStats } from '@/features/dashboard/data/dashboardData'
import { buildCsv } from '@/utils/csv'

export default function EmployeesPage() {
  const [query, setQuery] = useState(
    () => new URLSearchParams(window.location.search).get('search') ?? '',
  )
  const [page, setPage] = useState(1)
  const [departmentFilter, setDepartmentFilter] = useState('All departments')
  const [statusFilter, setStatusFilter] = useState('All statuses')
  const pageSize = 5

  const [allEmployees, setAllEmployees] = useState<(typeof employees)[number][]>(() => {
    try {
      return JSON.parse(localStorage.getItem('hrm-employees') || 'null') || employees
    } catch {
      return employees
    }
  })
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allEmployees.filter((e: (typeof employees)[number]) => {
      const matchesSearch =
        !q ||
        `${e.firstName} ${e.lastName} ${e.id} ${e.email} ${e.status}`.toLowerCase().includes(q)
      const matchesDepartment =
        departmentFilter === 'All departments' || e.dept === departmentFilter
      const matchesStatus = statusFilter === 'All statuses' || e.status === statusFilter
      return matchesSearch && matchesDepartment && matchesStatus
    })
  }, [query, allEmployees, departmentFilter, statusFilter])

  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize)

  return (
    <PageContainer>
      <PageHeader
        title="Employees"
        subtitle="Manage your organization's employees and workforce information."
        actions={
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              className="button"
              onClick={() => {
                const csv = buildCsv(
                  ['ID', 'First name', 'Last name', 'Department', 'Email', 'Status'],
                  allEmployees.map((e: (typeof employees)[number]) => [
                    e.id,
                    e.firstName,
                    e.lastName,
                    e.dept,
                    e.email,
                    e.status,
                  ]),
                )
                const link = document.createElement('a')
                link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
                link.download = 'employees.csv'
                link.click()
                toast.success('Employee export downloaded')
              }}
            >
              <Download size={14} /> Export
            </button>
            <button
              className="button header__primary-button"
              onClick={() => navigateTo('/app/employees/create')}
            >
              <Plus size={14} /> Add Employee
            </button>
          </div>
        }
      />

      <div style={{ display: 'grid', gap: 12 }}>
        <div className="employee-toolbar">
          <input
            placeholder="Search employees, id, email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input"
          />
          <select
            className="input"
            aria-label="Filter by department"
            value={departmentFilter}
            onChange={(e) => {
              setDepartmentFilter(e.target.value)
              setPage(1)
            }}
          >
            <option>All departments</option>
            {departmentDistribution.map((department) => (
              <option key={department.name}>{department.name}</option>
            ))}
          </select>
          <select
            className="input"
            aria-label="Filter by status"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setPage(1)
            }}
          >
            <option>All statuses</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Probation</option>
          </select>
          <button
            className="button"
            onClick={() => {
              setQuery('')
              setDepartmentFilter('All departments')
              setStatusFilter('All statuses')
              setPage(1)
            }}
          >
            Reset
          </button>
        </div>

        <div className="employee-stats">
          <div className="card">
            <div style={{ color: 'var(--color-muted)' }}>Total Employees</div>
            <div style={{ fontWeight: 700, fontSize: 21 }}>{allEmployees.length}</div>
          </div>
          <div className="card">
            <div style={{ color: 'var(--color-muted)' }}>Active Employees</div>
            <div style={{ fontWeight: 700, fontSize: 21 }}>
              {allEmployees.filter((e: (typeof employees)[number]) => e.status === 'Active').length}
            </div>
          </div>
          <div className="card">
            <div style={{ color: 'var(--color-muted)' }}>Inactive Employees</div>
            <div style={{ fontWeight: 700, fontSize: 21 }}>
              {
                allEmployees.filter((e: (typeof employees)[number]) => e.status === 'Inactive')
                  .length
              }
            </div>
          </div>
          <div className="card">
            <div style={{ color: 'var(--color-muted)' }}>New This Month</div>
            <div style={{ fontWeight: 700, fontSize: 21 }}>
              {kpiStats.find((stat) => stat.key === 'new')?.value ?? 0}
            </div>
          </div>
        </div>

        <section className="card employee-analytics">
          <div className="employee-analytics-heading">
            <div>
              <span className="eyebrow">TEAM MIX</span>
              <h3>Employees by Department</h3>
            </div>
            <span>
              {departmentDistribution.reduce((sum, department) => sum + department.count, 0)}{' '}
              employees
            </span>
          </div>
          <div className="employee-department-bars">
            {departmentDistribution.map((department) => (
              <div className="employee-department-row" key={department.name}>
                <span>{department.name}</span>
                <div>
                  <i
                    style={{
                      width: `${(department.count / Math.max(...departmentDistribution.map((entry) => entry.count))) * 100}%`,
                    }}
                  />
                </div>
                <strong>{department.count}</strong>
              </div>
            ))}
          </div>
        </section>

        <div className="card">
          <div style={{ overflowX: 'auto' }}>
            <table className="table" style={{ minWidth: 900 }}>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Employee ID</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Joining Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((e) => (
                  <tr key={e.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 8,
                            background: 'rgba(17,24,39,0.04)',
                            display: 'grid',
                            placeItems: 'center',
                          }}
                        >
                          {e.firstName[0]}
                          {e.lastName[0]}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700 }}>
                            {e.firstName} {e.lastName}
                          </div>
                          <div style={{ color: 'var(--color-muted)', fontSize: 14 }}>{e.title}</div>
                        </div>
                      </div>
                    </td>
                    <td>{e.id}</td>
                    <td>{e.dept}</td>
                    <td>{e.title}</td>
                    <td>{e.email}</td>
                    <td>{e.phone}</td>
                    <td>{e.joinDate}</td>
                    <td>
                      <StatusBadge status={e.status} />
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          className="button"
                          aria-label={`View ${e.firstName}`}
                          onClick={() => navigateTo(`/app/employees/${e.id}`)}
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          className="button"
                          aria-label={`Edit ${e.firstName}`}
                          onClick={() => navigateTo(`/app/employees/${e.id}/edit`)}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          className="button"
                          aria-label={`Delete ${e.firstName}`}
                          onClick={() => {
                            if (window.confirm(`Delete ${e.firstName} ${e.lastName}?`)) {
                              const next = allEmployees.filter(
                                (person: (typeof employees)[number]) => person.id !== e.id,
                              )
                              localStorage.setItem('hrm-employees', JSON.stringify(next))
                              setAllEmployees(next)
                              setPage(1)
                              toast.success('Employee deleted successfully')
                            }
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: 'var(--color-muted)' }}>
            Showing {pageItems.length} of {filtered.length} employees
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="button" onClick={() => setPage((p) => Math.max(1, p - 1))}>
              Prev
            </button>
            <div style={{ display: 'grid', placeItems: 'center', minWidth: 36 }}>{page}</div>
            <button
              className="button"
              disabled={page * pageSize >= filtered.length}
              onClick={() => setPage((p) => Math.min(Math.ceil(filtered.length / pageSize), p + 1))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
