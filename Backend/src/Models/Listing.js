import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const listingSchema = new Schema({
    title: {
        type : String,
        required : true, }
    ,
    description:String,
    image: {
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b", // Ek valid default URL
            set: (v) => v === "" ? "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b" : v
        }
    },
    price:Number,
    location:String,
    country:String


})

export const Listing = mongoose.model("Listing",listingSchema)