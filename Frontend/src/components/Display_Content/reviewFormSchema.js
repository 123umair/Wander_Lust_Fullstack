import {z} from 'zod'
export const reviewfromSchema = z.object({
  comment: z.string().min(1, 'field is required'),
  rating: z.string() // ya number (agar convert karo)
})