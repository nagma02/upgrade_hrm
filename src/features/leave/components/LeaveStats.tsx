import { CalendarCheck2, CalendarClock, CalendarDays, CalendarX2, type LucideIcon } from 'lucide-react'

type LeaveStat = { label: string; value: number; caption: string; icon: LucideIcon; tone: string }

const icons = [CalendarDays, CalendarClock, CalendarCheck2, CalendarX2]
const tones = ['green', 'amber', 'teal', 'rose']
const captions = ['Across your organization', 'Waiting for manager review', 'Ready for time-off planning', 'Requests declined']

export default function LeaveStats({ total, pending, approved, rejected }: { total: number; pending: number; approved: number; rejected: number }) {
  const values = [total, pending, approved, rejected]
  const labels = ['Total requests', 'Pending review', 'Approved', 'Rejected']
  const stats: LeaveStat[] = values.map((value, index) => ({ label: labels[index], value, caption: captions[index], icon: icons[index], tone: tones[index] }))

  return (
    <section className="leave-stats" aria-label="Leave request summary">
      {stats.map(({ label, value, caption, icon: Icon, tone }) => (
        <article className="leave-stat-card" key={label}>
          <div className={`leave-stat-icon leave-stat-icon--${tone}`}><Icon size={19} strokeWidth={1.8} /></div>
          <div className="leave-stat-copy"><span>{label}</span><strong>{value}</strong><small>{caption}</small></div>
        </article>
      ))}
    </section>
  )
}
