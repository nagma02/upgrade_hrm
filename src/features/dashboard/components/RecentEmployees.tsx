import React from 'react'

const mock = [
  { id: 'E-1001', name: 'Jane Cooper', role: 'Software Engineer' },
  { id: 'E-1002', name: 'John Doe', role: 'Product Designer' },
  { id: 'E-1003', name: 'Aisha Khan', role: 'HR Manager' },
]

export default function RecentEmployees() {
  return (
    <div className="card">
      <h3 className="section-title">Recent Employees</h3>
      <div style={{ marginTop: 12 }}>
        {mock.map((m) => (
          <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
            <div>
              <div style={{ fontWeight: 700 }}>{m.name}</div>
              <div style={{ color: 'var(--muted)', fontSize: 14 }}>{m.role}</div>
            </div>
            <div style={{ color: 'var(--muted)' }}>{m.id}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
