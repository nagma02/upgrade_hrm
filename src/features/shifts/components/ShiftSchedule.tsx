import { Clock3, Users } from 'lucide-react'
import type { ModuleRow } from '@/features/shared/data/moduleData'
import { shiftAssignmentCounts } from '@/features/shared/data/moduleData'

function toMinutes(value: string) {
  const match = value.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)
  if (!match) return null
  let hours = Number(match[1]) % 12
  if (match[3].toUpperCase() === 'PM') hours += 12
  return hours * 60 + Number(match[2])
}

function shiftHours(value: string) {
  const [start, end] = value.split('—').map((part) => part.trim())
  return { start: toMinutes(start), end: toMinutes(end) }
}

export default function ShiftSchedule({ rows }: { rows: ModuleRow[] }) {
  const rangeStart = 6 * 60
  const rangeEnd = 22 * 60
  const ticks = ['6 AM', '10 AM', '2 PM', '6 PM', '10 PM']

  return (
    <section className="shift-board" aria-labelledby="shift-board-title">
      <div className="shift-board-heading">
        <div><span className="module-section-kicker">DAILY COVERAGE</span><h2 id="shift-board-title">Shift schedule</h2><p>See how your scheduled hours overlap throughout the day.</p></div>
        <div className="shift-board-total"><strong>{rows.filter((row) => row.status === 'Active').length}</strong><span>active schedules</span></div>
      </div>
      <div className="shift-timeline-axis" aria-hidden="true"><span>SHIFT</span><div>{ticks.map((tick) => <span key={tick}>{tick}</span>)}</div></div>
      <div className="shift-timeline-rows">
        {rows.map((row) => {
          const { start, end } = shiftHours(row.department)
          const left = start === null ? 0 : Math.max(0, Math.min(100, (start - rangeStart) / (rangeEnd - rangeStart) * 100))
          const right = end === null ? 0 : Math.max(0, Math.min(100, (end - rangeStart) / (rangeEnd - rangeStart) * 100))
          const width = start === null || end === null ? 0 : Math.max(3, right - left)
          const assigned = shiftAssignmentCounts[row.id] ?? 0
          return (
            <article className="shift-timeline-row" key={row.id}>
              <div className="shift-timeline-meta"><span className="shift-timeline-icon"><Clock3 size={17} /></span><span><strong>{row.name}</strong><small>{row.detail}</small></span></div>
              <div className="shift-timeline-track" aria-label={`${row.name}: ${row.department}`}>
                <span className="shift-timeline-fill" style={{ left: `${left}%`, width: `${width}%` }} />
                {start !== null && end !== null ? <span className="shift-timeline-time" style={{ left: `${left}%`, width: `${width}%` }}>{row.department}</span> : <span className="shift-timeline-unset">{row.department || 'Schedule details needed'}</span>}
              </div>
              <span className="shift-timeline-assigned"><Users size={14} />{assigned}</span>
            </article>
          )
        })}
        {!rows.length && <div className="shift-board-empty">No shifts yet. Add a shift to start planning coverage.</div>}
      </div>
      <div className="shift-board-legend"><span><i /> Scheduled hours</span><span><Users size={14} /> Employee assignments shown at right</span></div>
    </section>
  )
}
