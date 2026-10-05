import { Building2, Users } from 'lucide-react'
import type { ModuleRow } from '@/features/shared/data/moduleData'
import { designationCounts } from '@/features/shared/data/moduleData'
import { departmentDistribution } from '@/features/dashboard/data/dashboardData'

function employeeCount(row: ModuleRow) {
  return designationCounts[row.id] ?? Number(row.detail.match(/(\d+) employees?/)?.[1] ?? 0)
}

export default function DepartmentDesignationAnalysis({ rows }: { rows: ModuleRow[] }) {
  const designations = rows.map((row) => ({ ...row, employees: employeeCount(row) }))
  const departments = [
    ...new Set([
      ...departmentDistribution.map((department) => department.name),
      ...rows.map((row) => row.department.trim() || 'Unassigned'),
    ]),
  ]
  const max = Math.max(...designations.map((row) => row.employees), 1)

  return (
    <section
      className="designation-department-analysis"
      aria-labelledby="designation-department-title"
    >
      <div className="designation-module-heading">
        <div>
          <span className="designation-section-kicker">DEPARTMENT RELATIONSHIPS</span>
          <h2 id="designation-department-title">Department × designation</h2>
          <p>Compare employee distribution across teams and roles.</p>
        </div>
        <div className="designation-department-key">
          <i /> Employee count by designation
        </div>
      </div>
      <div className="designation-matrix-scroll">
        <table className="designation-matrix">
          <thead>
            <tr>
              <th>Department</th>
              {designations.map((role) => (
                <th key={role.id} title={role.name}>
                  {role.name}
                </th>
              ))}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department) => {
              const cells = designations.map((role) => ({
                role,
                count:
                  role.department === department ||
                  (department === 'People & Culture' && role.department === 'People')
                    ? role.employees
                    : 0,
              }))
              const total = cells.reduce((sum, cell) => sum + cell.count, 0)
              return (
                <tr key={department}>
                  <th scope="row">
                    <span className="designation-matrix-department">
                      <Building2 size={15} />
                      {department}
                    </span>
                  </th>
                  {cells.map(({ role, count }) => (
                    <td key={role.id}>
                      <div className="designation-matrix-cell">
                        <span className="designation-matrix-track">
                          <i
                            style={{ width: `${count ? Math.max(5, (count / max) * 100) : 0}%` }}
                          />
                        </span>
                        <b>{count}</b>
                      </div>
                    </td>
                  ))}
                  <td>
                    <strong className="designation-matrix-total">
                      <Users size={14} />
                      {total}
                    </strong>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
