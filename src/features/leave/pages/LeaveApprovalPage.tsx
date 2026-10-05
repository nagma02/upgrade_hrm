import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, X } from 'lucide-react'
import { toast } from 'sonner'
import PageContainer from '@/features/shared/PageContainer'
import PageHeader from '@/features/shared/PageHeader'
import { formatLeaveDate, leaveService } from '../services/leave.service'
import type { LeaveApplication } from '../types/leave.types'

export function LeaveApprovalPage() {
  const navigate = useNavigate()
  const [rows, setRows] = useState<LeaveApplication[]>(() => leaveService.list().filter((row) => row.status === 'Pending'))
  const act = (row: LeaveApplication, status: 'Approved' | 'Rejected') => {
    leaveService.updateStatus(row.id, status)
    setRows((current) => current.filter((item) => item.id !== row.id))
    toast.success(`Leave request ${status.toLowerCase()}.`)
  }
  return <PageContainer>
    <PageHeader title="Leave approvals" subtitle="Review pending time off requests." actions={<button className="button" onClick={() => navigate('/app/leave')}>All leave requests</button>} />
    <section className="panel data-panel">
      <div className="panel-head"><div><h2>Requests awaiting approval</h2><span>{rows.length} pending</span></div></div>
      <div className="table-scroll"><table className="hr-table leave-table"><thead><tr><th>Employee</th><th>Leave type</th><th>Dates</th><th>Days</th><th>Reason</th><th>Actions</th></tr></thead><tbody>
        {rows.map((row) => <tr key={row.id}><td><div className="person-cell"><span className="avatar-mini">{row.employeeName.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span><span><b>{row.employeeName}</b><small>{row.id}</small></span></div></td><td>{row.leaveType}</td><td>{row.legacyPeriod ?? `${formatLeaveDate(row.startDate)} – ${formatLeaveDate(row.endDate)}`}</td><td>{row.numberOfDays}</td><td className="leave-reason-cell">{row.reason}</td><td><div className="row-actions"><button title="View details" aria-label={`View ${row.employeeName}'s leave details`} onClick={() => navigate(`/app/leave/${row.id}`)}>Details</button><button title="Approve" aria-label={`Approve ${row.employeeName}'s leave`} onClick={() => act(row, 'Approved')}><Check size={15}/></button><button title="Reject" aria-label={`Reject ${row.employeeName}'s leave`} onClick={() => act(row, 'Rejected')}><X size={15}/></button></div></td></tr>)}
      </tbody></table>{!rows.length && <div className="empty-state"><b>All caught up</b><span>There are no pending leave requests.</span></div>}</div>
    </section>
  </PageContainer>
}
