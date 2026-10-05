import { z } from 'zod'

export const attendanceSchema = z.object({
  employeeName: z.string().trim().min(2),
  department: z.string().trim().min(1),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  status: z.enum(['Present', 'Late', 'Absent', 'On Leave']),
})
export type AttendanceFormValues = z.infer<typeof attendanceSchema>
