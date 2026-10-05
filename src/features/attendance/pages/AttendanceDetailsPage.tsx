import { useParams } from 'react-router-dom'
import PageContainer from '@/features/shared/PageContainer'
import PageHeader from '@/features/shared/PageHeader'
import { moduleSeeds, type ModuleRow } from '@/features/shared/data/moduleData'
import { navigateTo } from '@/app/router/navigation'

function readRows(): ModuleRow[] {
  try {
    return JSON.parse(localStorage.getItem('hrm-attendance') || 'null') || moduleSeeds.attendance
  } catch {
    return moduleSeeds.attendance
  }
}

export function AttendanceDetailsPage() {
  const { id = '' } = useParams()
  const row = readRows().find((entry) => entry.id === id)
  if (!row)
    return (
      <PageContainer>
        <PageHeader
          title="Attendance record not found"
          subtitle="The selected record may have been removed."
        />
        <button className="button" onClick={() => navigateTo('/app/attendance')}>
          Back to attendance
        </button>
      </PageContainer>
    )
  const [checkIn = '—', checkOut = '—'] = row.detail.split('—').map((part) => part.trim())
  return (
    <PageContainer>
      <PageHeader
        title="Attendance details"
        subtitle={`${row.name} · ${row.id}`}
        actions={
          <button
            className="button primary"
            onClick={() =>
              navigateTo(`/app/attendance/corrections?record=${encodeURIComponent(row.id)}`)
            }
          >
            Request correction
          </button>
        }
      />
      <section className="card attendance-record-details">
        <dl>
          <div>
            <dt>Employee</dt>
            <dd>{row.name}</dd>
          </div>
          <div>
            <dt>Department</dt>
            <dd>{row.department}</dd>
          </div>
          <div>
            <dt>Date</dt>
            <dd>{row.date}</dd>
          </div>
          <div>
            <dt>Check-in</dt>
            <dd>{checkIn}</dd>
          </div>
          <div>
            <dt>Check-out</dt>
            <dd>{checkOut}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{row.status}</dd>
          </div>
        </dl>
      </section>
      <button className="button" onClick={() => navigateTo('/app/attendance')}>
        Back to attendance
      </button>
    </PageContainer>
  )
}
