import { ArrowDown, ArrowUp, BriefcaseBusiness, Layers3, Users } from 'lucide-react'
import { useState } from 'react'
import type { ModuleRow } from '@/features/shared/data/moduleData'
import { designationCounts } from '@/features/shared/data/moduleData'

function levelValue(detail: string) {
  return Number(detail.match(/level\s+(\d+)/i)?.[1] ?? 0)
}

function employeeCount(row: ModuleRow) {
  return designationCounts[row.id] ?? Number(row.detail.match(/(\d+) employees?/)?.[1] ?? 0)
}

export default function DesignationOverview({ rows }: { rows: ModuleRow[] }) {
  const levels = [...new Set(rows.map((row) => levelValue(row.detail)).filter(Boolean))].sort(
    (a, b) => a - b,
  )
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)
  const totalEmployees = rows.reduce((total, row) => total + employeeCount(row), 0)
  const topDesignation = [...rows].sort((a, b) => employeeCount(b) - employeeCount(a))[0]

  return (
    <section className="designation-hierarchy" aria-labelledby="designation-hierarchy-title">
      <div className="designation-module-heading">
        <div>
          <span className="designation-section-kicker">ROLE ARCHITECTURE</span>
          <h2 id="designation-hierarchy-title">Designation hierarchy</h2>
          <p>See how job levels and role ownership are organized.</p>
        </div>
        <span className="designation-heading-icon">
          <Layers3 size={18} />
        </span>
      </div>
      <div className="designation-hierarchy-body">
        <div className="designation-level-list">
          {levels.map((level, index) => {
            const roles = rows.filter((row) => levelValue(row.detail) === level)
            const employees = roles.reduce((total, row) => total + employeeCount(row), 0)
            return (
              <button
                type="button"
                className={`designation-level-row${selectedLevel === level ? ' is-selected' : ''}`}
                key={level}
                aria-pressed={selectedLevel === level}
                onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
              >
                <span className="designation-level-marker">
                  <span>L{level}</span>
                </span>
                <div className="designation-level-content">
                  <div className="designation-level-title">
                    <strong>Level {level}</strong>
                    <span>
                      {employees} {employees === 1 ? 'employee' : 'employees'}
                    </span>
                  </div>
                  <div className="designation-level-roles">
                    {roles.map((row) => (
                      <span key={row.id}>
                        <BriefcaseBusiness size={13} />
                        {row.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className="designation-level-order"
                  aria-label={
                    index === 0 ? 'Highest listed level' : `Level ${index + 1} in hierarchy`
                  }
                >
                  {index === 0 ? <ArrowUp size={15} /> : <ArrowDown size={15} />}
                </div>
              </button>
            )
          })}
          {!levels.length && (
            <p className="designation-level-empty">
              Add a level to a designation to show the role hierarchy.
            </p>
          )}
        </div>
        <aside className="designation-hierarchy-summary" aria-label="Designation summary">
          <div className="designation-summary-icon">
            <Users size={17} />
          </div>
          <span className="designation-summary-label">Employees in listed roles</span>
          <strong>{totalEmployees}</strong>
          <div className="designation-summary-divider" />
          <span className="designation-summary-label">Largest designation</span>
          <b>{topDesignation?.name ?? '—'}</b>
          <small>
            {topDesignation
              ? `${employeeCount(topDesignation)} employees · ${topDesignation.department}`
              : 'No designations yet'}
          </small>
        </aside>
      </div>
    </section>
  )
}
