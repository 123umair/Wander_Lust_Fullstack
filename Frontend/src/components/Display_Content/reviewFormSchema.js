import {z} from 'zod'
export const reviewfromSchema = z.object({
  review:z.object({
      rating: z.number().min(1).max(5),
      comment: z.string().min(1)
  })
})