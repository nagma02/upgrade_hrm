import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import PageContainer from '@/features/shared/PageContainer'
import LeaveAnalytics from '../components/LeaveAnalytics'
import LeaveFilters, { type LeaveFilter } from '../components/LeaveFilters'
import LeaveHeader from '../components/LeaveHeader'
import LeaveRequestTable from '../components/LeaveRequestTable'
import LeaveStats from '../components/LeaveStats'
import UpcomingTimeOff from '../components/UpcomingTimeOff'
import { leaveService } from '../services/leave.service'
import type { LeaveApplication, LeaveStatus } from '../types/leave.types'

export function LeavePage() {
  const [rows, setRows] = useState<LeaveApplication[]>(() => leaveService.list())
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<LeaveFilter>('All')
  const [leaveType, setLeaveType] = useState('All')
  const counts: Record<LeaveFilter, number> = {
    All: rows.length,
    Pending: rows.filter((row) => row.status === 'Pending').length,
    Approved: rows.filter((row) => row.status === 'Approved').length,
    Rejected: rows.filter((row) => row.status === 'Rejected').length,
  }
  const breakdown: { status: LeaveStatus; count: number }[] = [
    { status: 'Approved', count: counts.Approved },
    { status: 'Pending', count: counts.Pending },
    { status: 'Rejected', count: counts.Rejected },
  ]
  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return rows.filter((row) => (
      `${row.employeeName} ${row.employeeEmail} ${row.id} ${row.leaveType} ${row.reason}`.toLowerCase().includes(normalizedQuery)
    ) && (filter === 'All' || row.status === filter) && (leaveType === 'All' || row.leaveType === leaveType))
  }, [rows, query, filter, leaveType])

  const changeStatus = (row: LeaveApplication, status: 'Approved' | 'Rejected') => {
    leaveService.updateStatus(row.id, status)
    setRows(leaveService.list())
    toast.success(`Leave request ${status.toLowerCase()}.`)
  }

  return (
    <PageContainer>
      <main className="leave-page">
        <LeaveHeader pending={counts.Pending} />
        <LeaveStats total={counts.All} pending={counts.Pending} approved={counts.Approved} rejected={counts.Rejected} />
        <div className="leave-content-grid">
          <section className="leave-requests-panel" aria-labelledby="leave-requests-title">
          <div className="leave-requests-heading">
            <div><span className="leave-widget-kicker">REQUEST MANAGEMENT</span><h2 id="leave-requests-title">Leave requests</h2><p>Review and manage time off across your organization.</p></div>
            <span className="leave-result-count">{filtered.length} shown</span>
          </div>
          <LeaveFilters query={query} filter={filter} leaveType={leaveType} counts={counts} onQueryChange={setQuery} onFilterChange={setFilter} onLeaveTypeChange={setLeaveType} />
          <LeaveRequestTable rows={filtered} onStatusChange={changeStatus} />
          </section>
          <aside className="leave-insights-rail" aria-label="Leave insights">
            <LeaveAnalytics breakdown={breakdown} total={counts.All} />
            <UpcomingTimeOff rows={rows} />
          </aside>
        </div>
      </main>
    </PageContainer>
  )
}
