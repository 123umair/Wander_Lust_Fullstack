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
    location: z.string().min(1, 'enter location'),
    // 🔥 Category validation added
    category: z.enum([
      "Trending", "Amazing pools", "Rooms", "Camping",
      "Castles", "Tropical", "Arctic", "New", "Design", "Cabins"
    ], {
      errorMap: () => ({ message: "Please select a valid category" })
    }),
  })
})





// 2️⃣ EDIT FORM SCHEMA (Image is Optional but type-safe ✅)
export const editFormSchema = z.object({
  listing: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().min(1, "Price must be greater than 0"),
    location: z.string().min(1, "Location is required"),
    country: z.string().min(1, "Country is required"),

    // ✅ FIX: Yeh check karega FileList ho, Empty ho, ya fir purana Image Object ho
    image: z.custom((val) => {
      if (!val) return true; // optional/empty
      if (val instanceof FileList) return true; // native input file selection
      if (typeof val === 'object' && 'url' in val) return true; // backend object syntax
      return false;
    }).optional()
  })
});
