import { CalendarDays } from 'lucide-react'
import type { CSSProperties } from 'react'
import { leaveBalanceTypes } from '../data/attendanceInsights'

export default function LeaveBalanceRadials() {
  return (
    <section className="attendance-leave-balances" aria-label="Leave balance overview">
      {leaveBalanceTypes.map((balance) => {
        const remaining = balance.key === 'casual' ? balance.total - balance.used : balance.used
        const percent = (remaining / balance.total) * 100
        const titleValue =
          balance.key === 'casual'
            ? `${balance.used} of ${balance.total} days used`
            : `${remaining} of ${balance.total} days`
        return (
          <article className="card leave-balance-card" key={balance.key}>
            <div
              className="leave-balance-ring"
              style={
                { '--ring-progress': `${percent}%`, '--ring-color': balance.color } as CSSProperties
              }
            >
              <CalendarDays size={17} />
            </div>
            <div>
              <span>{balance.label}</span>
              <strong>{titleValue}</strong>
              <small>Illustrative balance · demo</small>
            </div>
          </article>
        )
      })}
    </section>
  )
}
