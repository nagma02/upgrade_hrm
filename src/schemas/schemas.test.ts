import { describe, expect, it } from 'vitest'
import { authSchema } from './auth.schema'
import { employeeSchema } from './employee.schema'
import { leaveSchema } from '@/features/leave/schemas/leave.schema'

describe('shared form schemas', () => {
  it('rejects invalid email and short passwords', () => {
    expect(authSchema.safeParse({ email: 'bad', password: '123', rememberMe: false }).success).toBe(
      false,
    )
  })

  it('accepts a valid frontend demo login', () => {
    expect(
      authSchema.safeParse({ email: 'nagma@example.com', password: 'secret1', rememberMe: true })
        .success,
    ).toBe(true)
  })

  it('requires valid employee contact and job fields', () => {
    expect(
      employeeSchema.safeParse({ firstName: 'A', lastName: 'B', email: 'invalid' }).success,
    ).toBe(false)
  })

  it('rejects leave ranges where the end precedes the start', () => {
    expect(
      leaveSchema.safeParse({
        employeeId: 'E-1',
        leaveType: 'Annual Leave',
        startDate: '2026-10-10',
        endDate: '2026-10-09',
        reason: 'Family vacation',
      }).success,
    ).toBe(false)
  })
})
