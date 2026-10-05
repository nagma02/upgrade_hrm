import { z } from 'zod'

export const designationSchema = z.object({
  name: z.string().trim().min(2),
  department: z.string().trim().min(1),
  level: z.coerce.number().int().min(1).max(10),
  status: z.enum(['Active', 'Inactive']).default('Active'),
})
export type DesignationFormValues = z.infer<typeof designationSchema>
