import React from 'react'
import PageContainer from '@/features/shared/PageContainer'
import PageHeader from '@/features/shared/PageHeader'
import StatusBadge from '@/features/shared/StatusBadge'
import { useLocation } from '@/hooks/use-location'
import { employees } from '../data/employeesData'
import { navigateTo } from '@/app/router/navigation'
import { toast } from 'sonner'

export default function EmployeeDetailsPage() {
  const path = useLocation()
  const id = path.split('/')[3]
  let employeeList
  try { employeeList = JSON.parse(localStorage.getItem('hrm-employees') || 'null') || employees } catch { employeeList = employees }
  const found = employeeList.find((e: { id: string }) => e.id === id) || employeeList[0]
  const mock = {
    id: found.id,
    name: `${found.firstName} ${found.lastName}`,
    title: found.title,
    dept: found.dept,
    email: found.email,
    phone: found.phone,
    joinDate: found.joinDate,
    manager: 'Carlos Reyes',
  }

  return (
    <PageContainer>
      <PageHeader title="Employee Details" subtitle={`${mock.name} — ${mock.title}`} actions={<div style={{ display: 'flex', gap: 8 }}><button className="button" onClick={() => navigateTo(`/app/employees/${mock.id}/edit`)}>Edit</button><button className="button" onClick={() => {if(window.confirm(`Delete ${mock.name}?`)){localStorage.setItem('hrm-employees',JSON.stringify(employeeList.filter((e:{id:string})=>e.id!==mock.id)));toast.success('Employee deleted successfully');navigateTo('/app/employees')}}}>Delete</button></div>} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 16 }}>
        <div style={{ display: 'grid', gap: 12 }}>
          <div className="card">
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 72, height: 72, borderRadius: 12, background: 'rgba(17,24,39,0.04)', display: 'grid', placeItems: 'center', fontWeight: 800 }}>JC</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 19 }}>{mock.name}</div>
                <div style={{ color: 'var(--color-muted)' }}>{mock.title} — {mock.dept}</div>
                <div style={{ marginTop: 8 }}><StatusBadge status="Active" /></div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="section-title">Overview</h3>
            <div style={{ display: 'grid', gap: 8, marginTop: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><div style={{ color: 'var(--color-muted)' }}>Email</div><div>{mock.email}</div></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><div style={{ color: 'var(--color-muted)' }}>Phone</div><div>{mock.phone}</div></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><div style={{ color: 'var(--color-muted)' }}>Manager</div><div>{mock.manager}</div></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><div style={{ color: 'var(--color-muted)' }}>Join Date</div><div>{mock.joinDate}</div></div>
            </div>
          </div>

          <div className="card">
            <h3 className="section-title">Attendance</h3>
            <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ color: 'var(--color-muted)' }}>Present</div>
                <div style={{ fontWeight: 800, fontSize: 21 }}>198</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: 'var(--color-muted)' }}>Absent</div>
                <div style={{ fontWeight: 800, fontSize: 21 }}>12</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: 'var(--color-muted)' }}>Late</div>
                <div style={{ fontWeight: 800, fontSize: 21 }}>5</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          <div className="card">
            <h3 className="section-title">Leave</h3>
            <div style={{ marginTop: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><div style={{ color: 'var(--color-muted)' }}>Total Leave</div><div style={{ fontWeight: 800 }}>18</div></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><div style={{ color: 'var(--color-muted)' }}>Used</div><div style={{ fontWeight: 800 }}>6</div></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><div style={{ color: 'var(--color-muted)' }}>Remaining</div><div style={{ fontWeight: 800 }}>12</div></div>
            </div>
          </div>

          <div className="card">
            <h3 className="section-title">Recent Activity</h3>
            <div style={{ marginTop: 12 }}>
              <div style={{ color: 'var(--color-muted)' }}>10:30 AM — Jane Cooper joined Engineering</div>
              <div style={{ color: 'var(--color-muted)', marginTop: 8 }}>09:45 AM — Leave approved for John Doe</div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
