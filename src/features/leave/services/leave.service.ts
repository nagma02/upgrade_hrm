import { format, parseISO } from 'date-fns'
import type { LeaveApplication, LeaveApplicationInput, LeaveStatus, LeaveType } from '../types/leave.types'

const storageKey = 'hrm-leave'

function today() {
  return format(new Date(), 'yyyy-MM-dd')
}

const seed: LeaveApplication[] = [
  { id: 'LV-1024', employeeId: 'E-1001', employeeName: 'Jane Cooper', employeeEmail: 'jane.cooper@example.com', leaveType: 'Annual Leave', startDate: '2026-10-10', endDate: '2026-10-14', numberOfDays: 5, reason: 'Family trip', status: 'Pending', appliedDate: '2026-10-01' },
  { id: 'LV-1023', employeeId: 'E-1003', employeeName: 'Aisha Khan', employeeEmail: 'aisha.khan@example.com', leaveType: 'Sick Leave', startDate: '2026-10-07', endDate: '2026-10-08', numberOfDays: 2, reason: 'Medical appointment', status: 'Approved', appliedDate: '2026-10-01' },
  { id: 'LV-1022', employeeId: 'E-1006', employeeName: 'Carlos Reyes', employeeEmail: 'carlos.reyes@example.com', leaveType: 'Casual Leave', startDate: '2026-10-03', endDate: '2026-10-03', numberOfDays: 1, reason: 'Personal', status: 'Rejected', appliedDate: '2026-10-01' },
]

function isLeaveType(value: string): value is LeaveType {
  return ['Casual Leave', 'Sick Leave', 'Earned Leave', 'Annual Leave', 'Emergency Leave', 'Unpaid Leave'].includes(value)
}

function normalizeStatus(value: unknown): LeaveStatus {
  return value === 'Approved' || value === 'Rejected' ? value : 'Pending'
}

function fromLegacy(value: unknown): LeaveApplication[] | null {
  if (!Array.isArray(value)) return null
  return value.flatMap((entry): LeaveApplication[] => {
    if (!entry || typeof entry !== 'object') return []
    const row = entry as Record<string, unknown>
    const rawLeaveType = String(row.leaveType ?? '')
    if (typeof row.employeeName === 'string' && typeof row.startDate === 'string' && typeof row.endDate === 'string' && isLeaveType(rawLeaveType)) {
      return [{
        id: String(row.id ?? `LV-${Date.now()}`), employeeId: String(row.employeeId ?? row.employeeEmail ?? row.id ?? ''),
        employeeName: row.employeeName, employeeEmail: String(row.employeeEmail ?? ''), leaveType: rawLeaveType,
        startDate: row.startDate, endDate: row.endDate, numberOfDays: Number(row.numberOfDays) || 1,
        reason: String(row.reason ?? ''), status: normalizeStatus(row.status), appliedDate: String(row.appliedDate ?? today()),
        ...(typeof row.legacyPeriod === 'string' ? { legacyPeriod: row.legacyPeriod } : {}),
      }]
    }

    // Preserve records created by the former generic Leave page.
    if (typeof row.name !== 'string') return []
    const detail = String(row.detail ?? '')
    const [rawType, ...reason] = detail.split('·')
    const typeLabel = rawType.trim()
    const leaveType: LeaveType = isLeaveType(typeLabel) ? typeLabel : 'Casual Leave'
    const date = today()
    return [{
      id: String(row.id ?? `LV-${Date.now()}`), employeeId: String(row.id ?? row.name), employeeName: row.name,
      employeeEmail: '', leaveType, startDate: date, endDate: date, numberOfDays: 1,
      reason: reason.join('·').trim() || detail || 'Existing leave request', status: normalizeStatus(row.status),
      appliedDate: date, ...(typeof row.date === 'string' ? { legacyPeriod: row.date } : {}),
    }]
  })
}

function read(): LeaveApplication[] {
  try {
    const raw = localStorage.getItem(storageKey)
    if (!raw) return seed
    return fromLegacy(JSON.parse(raw)) ?? seed
  } catch {
    return seed
  }
}

function write(records: LeaveApplication[]) {
  localStorage.setItem(storageKey, JSON.stringify(records))
}

export const leaveService = {
  list: read,
  getById(id: string) {
    return read().find((record) => record.id === id)
  },
  applyLeave(data: LeaveApplicationInput) {
    const record: LeaveApplication = {
      ...data,
      id: `LV-${Date.now().toString().slice(-6)}`,
      status: 'Pending',
      appliedDate: today(),
    }
    write([record, ...read()])
    return record
  },
  updateStatus(id: string, status: Exclude<LeaveStatus, 'Pending'>) {
    const records = read()
    const updated = records.map((record) => record.id === id ? { ...record, status } : record)
    write(updated)
    return updated.find((record) => record.id === id)
  },
}

export function formatLeaveDate(value: string) {
  try { return format(parseISO(value), 'dd MMM yyyy') } catch { return value }
}
