import { z } from 'zod'

export const authSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6),
  rememberMe: z.boolean(),
})
export type AuthFormValues = z.infer<typeof authSchema>
