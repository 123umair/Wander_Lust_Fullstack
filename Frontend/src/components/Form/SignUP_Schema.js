import { z } from 'zod'


export const  singUP_Schema= z.object({
    email:z.string().email().min(1,'email required'),
    username:z.string().min(1,'name required'),
    password: z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/[0-9]/, "Must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Must contain at least one special character")


})