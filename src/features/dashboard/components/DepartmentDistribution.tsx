import { departmentDistribution, departmentTotal } from '../data/dashboardData'

export default function DepartmentDistribution() {
  const max = Math.max(...departmentDistribution.map((department) => department.count))

  return (
    <section className="card department-distribution-card">
      <div className="department-heading">
        <div><div className="badge badge--info">Departments</div><h3 className="section-title">Department Distribution</h3></div>
        <span>{departmentTotal} employees</span>
      </div>

      <div className="department-list">
        {departmentDistribution.map((department) => (
          <div className="department-row" key={department.name}>
            <span className="department-name">{department.name}</span>
            <div className="department-track" role="progressbar" aria-label={`${department.name} employees`} aria-valuemin={0} aria-valuemax={max} aria-valuenow={department.count}>
              <span style={{ width: `${(department.count / max) * 100}%` }} />
            </div>
            <strong className="department-count">{department.count}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}
