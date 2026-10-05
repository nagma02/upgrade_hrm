import { ArrowUpRight, CalendarDays } from 'lucide-react'
import { format, isValid, parseISO } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import type { LeaveApplication } from '../types/leave.types'

const today = new Date().toISOString().slice(0, 10)

function dateLabel(value: string) {
  const date = parseISO(value)
  return isValid(date) ? format(date, 'dd MMM') : value
}

export default function UpcomingTimeOff({ rows }: { rows: LeaveApplication[] }) {
  const navigate = useNavigate()
  const upcoming = rows
    .filter((row) => row.startDate >= today && row.status !== 'Rejected')
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .slice(0, 3)

  return (
    <section className="leave-widget leave-upcoming-widget" aria-labelledby="upcoming-time-off-title">
      <div className="leave-widget-heading">
        <div className="leave-widget-icon leave-widget-icon--soft"><CalendarDays size={17} /></div>
        <div><span className="leave-widget-kicker">TEAM CALENDAR</span><h2 id="upcoming-time-off-title">Upcoming time off</h2></div>
        <button className="leave-widget-link" onClick={() => navigate('/app/leave')} aria-label="View all leave requests"><ArrowUpRight size={17} /></button>
      </div>
      <div className="leave-upcoming-list">
        {upcoming.map((row) => (
          <button className="leave-upcoming-row" key={row.id} onClick={() => navigate(`/app/leave/${row.id}`)}>
            <span className="leave-upcoming-date"><strong>{dateLabel(row.startDate)}</strong><small>{row.numberOfDays} {row.numberOfDays === 1 ? 'day' : 'days'}</small></span>
            <span className="leave-upcoming-person"><b>{row.employeeName}</b><small>{row.leaveType}</small></span>
            <span className={`leave-upcoming-status leave-upcoming-status--${row.status.toLowerCase()}`}>{row.status}</span>
          </button>
        ))}
        {!upcoming.length && <div className="leave-upcoming-empty"><CalendarDays size={19} /><span>No upcoming approved or pending leave.</span></div>}
      </div>
    </section>
  )
}
