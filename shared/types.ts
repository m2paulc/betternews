import { z } from "zod"

export type SuccessResponse<T = void> = {
  success: true
  message: string
} & (T extends void ? {} : { data: T })

export type ErrorResponse = {
  success: false
  message: string
  isFormError?: boolean
}

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long")
    .regex(/^[a-zA-Z0-9_]+$/),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(30),
})
