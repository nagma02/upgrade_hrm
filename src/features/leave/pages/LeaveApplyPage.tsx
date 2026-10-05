import { useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInCalendarDays, format, parseISO } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuth } from '@/app/providers/use-auth'
import PageContainer from '@/features/shared/PageContainer'
import PageHeader from '@/features/shared/PageHeader'
import { employees } from '@/features/employees/data/employeesData'
import { leaveSchema, type LeaveFormValues } from '../schemas/leave.schema'
import { leaveService } from '../services/leave.service'
import { leaveTypes } from '../types/leave.types'
import { sanitizeText } from '@/utils/sanitize-text'

export function LeaveApplyPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const employeeOptions = useMemo(() => {
    const options = employees.map((employee) => ({
      id: employee.id,
      name: `${employee.firstName} ${employee.lastName}`,
      email: employee.email,
    }))
    if (
      user &&
      !options.some((employee) => employee.email.toLowerCase() === user.email.toLowerCase())
    ) {
      options.unshift({
        id: user.id || user.email,
        name: user.name || user.email,
        email: user.email,
      })
    }
    return options
  }, [user])
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LeaveFormValues>({
    resolver: zodResolver(leaveSchema),
    defaultValues: {
      employeeId: user
        ? (employeeOptions.find(
            (employee) => employee.email.toLowerCase() === user.email.toLowerCase(),
          )?.id ??
          user.id ??
          user.email)
        : '',
      leaveType: undefined,
      startDate: '',
      endDate: '',
      reason: '',
    },
  })
  const [startDate, endDate] = useWatch({ control, name: ['startDate', 'endDate'] })
  const numberOfDays =
    startDate && endDate && endDate >= startDate
      ? differenceInCalendarDays(parseISO(endDate), parseISO(startDate)) + 1
      : 0
  const [minimumDate] = useState(() => format(new Date(), 'yyyy-MM-dd'))

  const submit = handleSubmit(async (values) => {
    setSubmitting(true)
    try {
      // Let the loading state render before completing the synchronous local mock write.
      await new Promise((resolve) => window.setTimeout(resolve, 250))
      const employee = employeeOptions.find((option) => option.id === values.employeeId)
      if (!employee) throw new Error('Employee not found')
      leaveService.applyLeave({
        employeeId: employee.id,
        employeeName: employee.name,
        employeeEmail: employee.email,
        leaveType: values.leaveType,
        startDate: values.startDate,
        endDate: values.endDate,
        numberOfDays:
          differenceInCalendarDays(parseISO(values.endDate), parseISO(values.startDate)) + 1,
        reason: sanitizeText(values.reason),
      })
      toast.success('Leave application submitted successfully.')
      navigate('/app/leave')
    } catch {
      toast.error('Unable to submit leave application. Please try again.')
    } finally {
      setSubmitting(false)
    }
  })

  return (
    <PageContainer>
      <PageHeader
        title="Apply for Leave"
        subtitle="Submit a time off request for manager review."
      />
      <form className="employee-form leave-form" onSubmit={submit} noValidate>
        <section className="card">
          <h3 className="section-title">Leave request details</h3>
          <p className="form-hint">Complete the information below to submit your request.</p>
          <div className="employee-form-grid">
            <label className="employee-field">
              Employee
              <select
                className="input leave-input"
                aria-invalid={Boolean(errors.employeeId)}
                {...register('employeeId')}
              >
                <option value="">Select an employee</option>
                {employeeOptions.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name} · {employee.email}
                  </option>
                ))}
              </select>
              {errors.employeeId && <small role="alert">{errors.employeeId.message}</small>}
            </label>
            <label className="employee-field">
              Leave type
              <select
                className="input leave-input"
                aria-invalid={Boolean(errors.leaveType)}
                {...register('leaveType')}
              >
                <option value="">Select a leave type</option>
                {leaveTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.leaveType && <small role="alert">{errors.leaveType.message}</small>}
            </label>
            <label className="employee-field">
              Start date
              <input
                className="leave-input"
                type="date"
                min={minimumDate}
                aria-invalid={Boolean(errors.startDate)}
                {...register('startDate')}
              />
              {errors.startDate && <small role="alert">{errors.startDate.message}</small>}
            </label>
            <label className="employee-field">
              End date
              <input
                className="leave-input"
                type="date"
                min={startDate || minimumDate}
                aria-invalid={Boolean(errors.endDate)}
                {...register('endDate')}
              />
              {errors.endDate && <small role="alert">{errors.endDate.message}</small>}
            </label>
            <label className="employee-field leave-days-field">
              Number of days
              <input
                className="leave-input"
                value={numberOfDays || ''}
                readOnly
                aria-readonly="true"
                placeholder="Calculated from selected dates"
              />
              <span className="leave-field-hint">
                {numberOfDays
                  ? `${numberOfDays} calendar ${numberOfDays === 1 ? 'day' : 'days'}`
                  : 'Choose a valid date range'}
              </span>
            </label>
            <label className="employee-field leave-reason-field">
              Reason for leave
              <textarea
                className="leave-input"
                rows={4}
                maxLength={500}
                placeholder="Share a brief reason for your request (10–500 characters)."
                aria-invalid={Boolean(errors.reason)}
                {...register('reason')}
              />
              {errors.reason && <small role="alert">{errors.reason.message}</small>}
            </label>
          </div>
        </section>
        <div className="form-actions">
          <button
            type="button"
            className="button"
            disabled={submitting}
            onClick={() => navigate('/app/leave')}
          >
            Cancel
          </button>
          <button className="button primary" type="submit" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Apply Leave'}
          </button>
        </div>
      </form>
    </PageContainer>
  )
}
