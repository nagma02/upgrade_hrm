import { Building2, MapPin, Users } from 'lucide-react'
import { departmentDistribution } from '@/features/dashboard/data/dashboardData'
import { departmentManagers, type ModuleRow } from '@/features/shared/data/moduleData'

function employeeCount(name: string) {
  return departmentDistribution.find((item) => item.name === name || (name === 'People & Culture' && item.name === 'HR'))?.count ?? 0
}

export default function DepartmentDistribution({ rows }: { rows: ModuleRow[] }) {
  const departments = rows.map((row) => ({
    row,
    employees: employeeCount(row.name),
    manager: departmentManagers[row.name] ?? row.department ?? 'Unassigned',
  }))
  const max = Math.max(...departments.map((item) => item.employees), 1)
  const total = departments.reduce((sum, item) => sum + item.employees, 0)

  return (
    <section className="department-overview" aria-labelledby="department-overview-title">
      <div className="department-overview-heading">
        <div><span className="module-section-kicker">ORGANIZATION</span><h2 id="department-overview-title">Department distribution</h2><p>Team size and ownership across the organization.</p></div>
        <span className="department-overview-total"><Users size={15} />{total} employees</span>
      </div>
      <div className="department-overview-grid">
        {departments.map(({ row, employees, manager }) => (
          <article className="department-overview-card" key={row.id}>
            <div className="department-overview-card-top"><span className="department-overview-icon"><Building2 size={17} /></span><span className={`status-pill status-${row.status.toLowerCase()}`}><i />{row.status}</span></div>
            <h3>{row.name}</h3>
            <div className="department-overview-meta"><span>Department lead</span><strong>{manager}</strong></div>
            <div className="department-overview-meta"><span><MapPin size={13} />{row.detail}</span><strong>{employees} people</strong></div>
            <div className="department-distribution-track"><i style={{ width: `${employees / max * 100}%` }} /></div>
          </article>
        ))}
        {!departments.length && <div className="department-overview-empty">No departments yet. Add a department to build your organization structure.</div>}
      </div>
    </section>
  )
}
