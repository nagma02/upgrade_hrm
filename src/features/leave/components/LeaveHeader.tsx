import { ArrowRight, CalendarDays, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function LeaveHeader({ pending }: { pending: number }) {
  const navigate = useNavigate()

  return (
    <header className="leave-hero">
      <div className="leave-hero-copy">
        <span className="leave-hero-kicker"><CalendarDays size={14} /> PEOPLE OPERATIONS</span>
        <h1 className="app-page-title">Leave management</h1>
        <p>Keep time-off requests organized and help your team plan ahead.</p>
      </div>
      <div className="leave-hero-actions">
        <button className="leave-hero-secondary" onClick={() => navigate('/app/leave/approvals')}>
          Review approvals{pending > 0 && <span>{pending}</span>}<ArrowRight size={15} />
        </button>
        <button className="leave-hero-primary" onClick={() => navigate('/app/leave/apply')}><Plus size={16} /> Apply for leave</button>
      </div>
      <div className="leave-hero-orb" aria-hidden="true" />
    </header>
  )
}
