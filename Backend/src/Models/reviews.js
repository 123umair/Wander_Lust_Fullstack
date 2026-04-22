import mongoose from 'mongoose'
import {Schema} from 'mongoose'

const reviewsSchema = new Schema({
        comment:String,
        rating:{
                type:String,
                min : 1,
                max : 5,
        },
        createdAt:{
                type:Date,
                default:Date.now()
        }
})
export const reviewModel = mongoose.model("Review",reviewsSchema)