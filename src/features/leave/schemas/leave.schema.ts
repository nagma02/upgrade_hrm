import { z } from 'zod'
import { format, isValid, parseISO } from 'date-fns'
import { leaveTypes } from '../types/leave.types'

const dateField = z.string().min(1, 'Please select a date.').refine((value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const parsed = parseISO(value)
  return isValid(parsed) && format(parsed, 'yyyy-MM-dd') === value
}, 'Please enter a valid date.')

export const leaveSchema = z.object({
  employeeId: z.string().min(1, 'Please select an employee.'),
  leaveType: z.enum(leaveTypes, { error: 'Please select a leave type.' }),
  startDate: dateField,
  endDate: dateField,
  reason: z.string().trim().min(10, 'Please provide a reason with at least 10 characters.').max(500, 'Reason must be 500 characters or fewer.'),
}).superRefine((value, context) => {
  if (value.startDate && value.endDate && value.endDate < value.startDate) {
    context.addIssue({ code: 'custom', path: ['endDate'], message: 'End date cannot be before the start date.' })
  }
})

export type LeaveFormValues = z.infer<typeof leaveSchema>
