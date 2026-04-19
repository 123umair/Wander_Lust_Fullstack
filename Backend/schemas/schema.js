import { z } from 'zod';


export const listingSchema = z.object({
    listing:z.object({
        title:z.string(), // required by default
        description:z.string(),
       image: z.object({
            url: z.string().nullable().optional()
        }).optional(), // means image field  will be empty or will in values or its will not include the values means empty..
        price: z.number().min(1, "enter the Price."),
        country:z.string(), 
        location:z.string(),
        // now we are adding the serverside validation
        
    })
})