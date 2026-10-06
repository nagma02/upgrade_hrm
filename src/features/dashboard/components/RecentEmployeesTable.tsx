import React from 'react'
import { recentEmployees } from '../data/dashboardData'

export default function RecentEmployeesTable() {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div className="badge badge--info">People</div>
          <h3 className="section-title">Recent Employees</h3>
        </div>
        <div style={{ color: 'var(--color-muted)' }}>Latest hires</div>
      </div>

      <div className="dashboard-table-scroll" style={{ marginTop: 12, overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', minWidth: 720 }}>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Employee ID</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Joining Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentEmployees.map((r) => (
              <tr key={r.id}>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(17,24,39,0.04)', display: 'grid', placeItems: 'center' }}>
                      {r.name.split(' ').map((n) => n[0]).slice(0,2).join('')}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700 }}>{r.name}</div>
                      <div style={{ color: 'var(--color-muted)', fontSize: 13 }}>{r.title}</div>
                    </div>
                  </div>
                </td>
                <td>{r.id}</td>
                <td>{r.dept}</td>
                <td>{r.title}</td>
                <td>{r.joinDate}</td>
                <td>
                  <div style={{ padding: '6px 10px', borderRadius: 9999, background: r.status === 'Active' ? 'rgba(42,166,95,0.08)' : 'rgba(250,204,21,0.08)', color: 'var(--color-text)', fontWeight: 700, fontSize: 13 }}>
                    {r.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
