import { CalendarClock, ClipboardCheck, Users, UserPlus } from 'lucide-react'
import { upcomingEvents } from '../data/dashboardData'

const eventIcons = {
  Meeting: Users,
  People: UserPlus,
  Performance: ClipboardCheck,
}

function eventDay(date: string) {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(year, month - 1, day).getDate()
}

function eventMonth(date: string) {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleString('en-US', { month: 'short' })
}

export default function UpcomingEvents() {
  return (
    <section className="card dashboard-events-card" aria-labelledby="upcoming-events-title">
      <div className="dashboard-section-heading">
        <div>
          <div className="badge badge--info">Events</div>
          <h3 className="section-title" id="upcoming-events-title">Upcoming Events</h3>
        </div>
        <CalendarClock className="dashboard-section-icon" size={17} aria-hidden="true" />
      </div>

      <div className="upcoming-event-list">
        {upcomingEvents.map((event) => {
          const Icon = eventIcons[event.category]
          return (
            <article className="upcoming-event" key={`${event.date}-${event.type}`}>
              <div className="upcoming-event-date" aria-label={event.dateLabel ?? event.date}>
                <span>{event.dateLabel ?? eventMonth(event.date)}</span>
                <strong>{event.dateLabel ? eventDay(event.date) : event.date.split('-')[2]}</strong>
              </div>
              <div className={`upcoming-event-icon upcoming-event-icon--${event.category.toLowerCase()}`} aria-hidden="true">
                <Icon size={15} />
              </div>
              <div className="upcoming-event-content">
                <div className="upcoming-event-title-row">
                  <h4>{event.type}</h4>
                  <span className={`upcoming-event-category upcoming-event-category--${event.category.toLowerCase()}`}>{event.category}</span>
                </div>
                <p>{event.person}</p>
                <span className="upcoming-event-time">{event.time ?? 'Time not scheduled'}</span>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
