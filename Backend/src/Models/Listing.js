import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const listingSchema = new Schema({
    title: {
        type : String,
        required : true, }
    ,
    description:String,
    image:{
      type:String,
      default:"url", // if image is undefined
       set:(v)=> v === "" // if image link is empty ? "url" : v
    },
    price:Number,
    location:String,
    country:String


})

export const Listing = mongoose.model("Listing",listingSchema)