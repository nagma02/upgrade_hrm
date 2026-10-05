import { BriefcaseBusiness, Cake, CalendarDays, CircleAlert, UserPlus, Users } from 'lucide-react'
import { hrInsights } from '../data/dashboardData'

const insightIcons = {
  employees: UserPlus,
  leave: CalendarDays,
  positions: BriefcaseBusiness,
  attendance: CircleAlert,
  birthday: Cake,
}

export default function HRInsights() {
  return (
    <section className="card hr-insights-card" aria-labelledby="hr-insights-title">
      <div className="dashboard-section-heading">
        <div>
          <div className="badge badge--info">Workforce</div>
          <h3 className="section-title" id="hr-insights-title">HR Insights</h3>
        </div>
        <Users className="dashboard-section-icon" size={17} aria-hidden="true" />
      </div>

      <ul className="hr-insights-list">
        {hrInsights.map((insight) => {
          const Icon = insightIcons[insight.icon]
          return (
            <li className="hr-insight-row" key={insight.key}>
              <span className={`hr-insight-icon hr-insight-icon--${insight.tone}`} aria-hidden="true"><Icon size={14} /></span>
              <span className="hr-insight-label">{insight.label}</span>
              <strong className={`hr-insight-value hr-insight-value--${insight.tone}`}>{insight.value}</strong>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
