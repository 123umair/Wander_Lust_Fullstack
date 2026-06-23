import React from 'react';
import { z } from 'zod'
export const formSchema = z.object({
  listing: z.object({
    title: z.string().min(1, 'title is required'),
    description: z.string().min(1, 'add description.'),
    image: z.instanceof(FileList, { message: 'Image file is required' })
      .refine((files) => files.length > 0, 'Please upload an image'),
    price: z.number().min(1, "enter the Price."),
    country: z.string().min(1, "country required."),
    location: z.string().min(1, 'enter location')
  })
})
