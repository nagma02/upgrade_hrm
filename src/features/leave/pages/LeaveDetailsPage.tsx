import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import PageContainer from '@/features/shared/PageContainer'
import PageHeader from '@/features/shared/PageHeader'
import { formatLeaveDate, leaveService } from '../services/leave.service'

export function LeaveDetailsPage() {
  const navigate = useNavigate()
  const { id = '' } = useParams()
  const record = leaveService.getById(id)
  if (!record) return <PageContainer><PageHeader title="Leave request not found" subtitle="This leave request may have been removed." actions={<button className="button" onClick={() => navigate('/app/leave')}>Back to leave</button>} /></PageContainer>

  const act = (status: 'Approved' | 'Rejected') => {
    leaveService.updateStatus(record.id, status)
    toast.success(`Leave request ${status.toLowerCase()}.`)
    navigate('/app/leave')
  }
  return <PageContainer>
    <PageHeader title="Leave request details" subtitle={`${record.employeeName} · ${record.id}`} actions={<button className="button" onClick={() => navigate('/app/leave')}>Back to leave</button>} />
    <section className="card leave-detail-card">
      <div className="leave-detail-heading"><div><p className="eyebrow">APPLICATION</p><h3>{record.leaveType}</h3></div><span className={`status-pill status-${record.status.toLowerCase()}`}><i/>{record.status}</span></div>
      <dl className="leave-detail-grid">
        <div><dt>Employee</dt><dd>{record.employeeName}</dd></div><div><dt>Email</dt><dd>{record.employeeEmail || '—'}</dd></div>
        <div><dt>Start date</dt><dd>{formatLeaveDate(record.startDate)}</dd></div><div><dt>End date</dt><dd>{formatLeaveDate(record.endDate)}</dd></div>
        <div><dt>Number of days</dt><dd>{record.numberOfDays} {record.numberOfDays === 1 ? 'day' : 'days'}</dd></div><div><dt>Applied date</dt><dd>{formatLeaveDate(record.appliedDate)}</dd></div>
        <div className="leave-detail-reason"><dt>Reason</dt><dd>{record.reason}</dd></div>
      </dl>
      {record.status === 'Pending' && <div className="form-actions"><button className="button leave-reject-button" onClick={() => act('Rejected')}>Reject</button><button className="button primary" onClick={() => act('Approved')}>Approve</button></div>}
    </section>
  </PageContainer>
}
