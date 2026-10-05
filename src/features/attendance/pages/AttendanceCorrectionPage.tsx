import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import PageContainer from '@/features/shared/PageContainer'
import PageHeader from '@/features/shared/PageHeader'
import { moduleSeeds, type ModuleRow } from '@/features/shared/data/moduleData'
import { attendanceSchema } from '@/schemas/attendance.schema'
import { sanitizeText } from '@/utils/sanitize-text'

type CorrectionRecord = {
  id: string
  employee: string
  date: string
  checkIn: string
  checkOut: string
  reason: string
  status: 'Pending'
}

function attendanceRows(): ModuleRow[] {
  try {
    return JSON.parse(localStorage.getItem('hrm-attendance') || 'null') || moduleSeeds.attendance
  } catch {
    return moduleSeeds.attendance
  }
}

export function AttendanceCorrectionPage() {
  const [params] = useSearchParams()
  const rows = attendanceRows()
  const selected = rows.find((row) => row.id === params.get('record'))
  const [employeeName, setEmployeeName] = useState(selected?.name ?? '')
  const [date, setDate] = useState(selected?.date ?? '')
  const [checkIn, setCheckIn] = useState(selected?.detail.split('—')[0]?.trim() ?? '')
  const [checkOut, setCheckOut] = useState(selected?.detail.split('—')[1]?.trim() ?? '')
  const [reason, setReason] = useState('')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (
      !attendanceSchema.safeParse({
        employeeName,
        department: selected?.department ?? 'General',
        checkIn,
        checkOut,
        status: selected?.status ?? 'Present',
      }).success
    ) {
      toast.error('Enter a valid employee name and attendance status.')
      return
    }
    const record: CorrectionRecord = {
      id: `AC-${Date.now()}`,
      employee: sanitizeText(employeeName),
      date: sanitizeText(date),
      checkIn: sanitizeText(checkIn),
      checkOut: sanitizeText(checkOut),
      reason: sanitizeText(reason),
      status: 'Pending',
    }
    let records: CorrectionRecord[] = []
    try {
      records = JSON.parse(
        localStorage.getItem('hrm-attendance-corrections') || '[]',
      ) as CorrectionRecord[]
    } catch {
      records = []
    }
    localStorage.setItem('hrm-attendance-corrections', JSON.stringify([record, ...records]))
    toast.success('Attendance correction submitted for review.')
    setReason('')
  }

  return (
    <PageContainer>
      <PageHeader
        title="Attendance correction"
        subtitle="Submit a check-in or check-out correction for review."
      />
      <form className="employee-form" onSubmit={submit}>
        <section className="card">
          <h2 className="section-title">Correction details</h2>
          <div className="employee-form-grid">
            <label className="employee-field">
              Employee
              <input
                required
                value={employeeName}
                onChange={(event) => setEmployeeName(event.target.value)}
              />
            </label>
            <label className="employee-field">
              Attendance date
              <input
                required
                value={date}
                onChange={(event) => setDate(event.target.value)}
                placeholder="Oct 05, 2026"
              />
            </label>
            <label className="employee-field">
              Correct check-in
              <input
                value={checkIn}
                onChange={(event) => setCheckIn(event.target.value)}
                placeholder="09:00 AM"
              />
            </label>
            <label className="employee-field">
              Correct check-out
              <input
                value={checkOut}
                onChange={(event) => setCheckOut(event.target.value)}
                placeholder="05:30 PM"
              />
            </label>
            <label className="employee-field employee-field--full">
              Reason
              <textarea
                required
                minLength={10}
                maxLength={500}
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                placeholder="Explain why this attendance record needs correction."
              />
            </label>
          </div>
        </section>
        <div className="form-actions">
          <button className="button primary" type="submit">
            Submit correction
          </button>
        </div>
      </form>
    </PageContainer>
  )
}
