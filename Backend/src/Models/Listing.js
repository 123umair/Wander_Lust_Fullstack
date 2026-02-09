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
      default:"https://unsplash.com/photos/sunflower-field-during-day-time-lk3F07BN8T8", // if image is undefined
       set:(v)=> v === "" ? "https://unsplash.com/photos/sunflower-field-during-day-time-lk3F07BN8T8" : v
    },
    price:Number,
    location:String,
    country:String


})

export const Listing = mongoose.model("Listing",listingSchema)