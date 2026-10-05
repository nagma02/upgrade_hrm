import React from 'react'
import { recentActivity } from '../data/dashboardData'

export default function RecentActivity() {
  return (
    <div className="card recent-activity-card">
      <div>
        <div className="badge badge--info">Activity</div>
        <h3 className="section-title">Recent Activity</h3>
      </div>

      <div className="recent-activity-timeline">
        {recentActivity.map((r) => (
          <div className="recent-activity-item" key={`${r.time}-${r.text}`}>
            <span className="recent-activity-marker" aria-hidden="true"/>
            <time>{r.time}</time>
            <div>{r.text}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
