import { z } from 'zod'

export const payrollSchema = z.object({
  employeeId: z.string().trim().min(1),
  amount: z.coerce.number().positive(),
  currency: z.string().trim().length(3).default('USD'),
  payPeriod: z.string().trim().min(1),
  status: z.enum(['Pending', 'Processed', 'Paid']),
})
export type PayrollFormValues = z.infer<typeof payrollSchema>
