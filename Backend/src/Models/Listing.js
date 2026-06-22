import mongoose from 'mongoose'
import { reviewModel } from './reviews.js';
import { Schema } from 'mongoose';

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    }
    ,
    description: String,
    image: {
        filename: {
            type: String
        },
        url: {
            type: String
        }
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    Owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }


})


listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await reviewModel.deleteMany({ _id: { $in: listing.reviews } })
    }
})
export const Listing = mongoose.model("Listing", listingSchema)
