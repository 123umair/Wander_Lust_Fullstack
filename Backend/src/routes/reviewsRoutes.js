import express from 'express'
import { wrapAsync } from '../../utils/wrapAsync.js';
const router = express.Router();
import { reviewModel } from '../Models/reviews.js';
import { Listing } from '../Models/Listing.js';

// show reviews
router.post('/:id/reviews',wrapAsync(async(req,res)=>{
const listing = await Listing.findById(req.params.id) //find out the listing where request the reviews.
const newReview = new reviewModel(req.body.review)
listing.reviews.push(newReview)
await newReview.save()
await listing.save()
res.json({sucess:true})

// .save() method is used for if we can any change make in the existing database.

}))
export default router