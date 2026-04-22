import express from 'express'
import { wrapAsync } from '../../utils/wrapAsync.js';
const router = express.Router({mergeParams:true});
import { reviewModel } from '../Models/reviews.js';
import { Listing } from '../Models/Listing.js';
import { listingSchema, reviewSchemaValid } from '../../schemas/schema.js';
import { ExpressError } from '../../utils/ExpressError.js';


// validation middlewear
const validateReviews = (req,res,next)=>{
const result = reviewSchemaValid.safeParse(req.body.review)

if (!result.success)
{
    const errorMsg = result.error.issues.map((el)=>el.message).join(", ");
    return next(new ExpressError(400,errorMsg))
}
req.body = result.data
next()
}



// show reviews
router.post('/',validateReviews,wrapAsync(async(req,res)=>{
const listing = await Listing.findById(req.params.id) //find out the listing where request the reviews.
const newReview = new reviewModel(req.body.review)
await newReview.save()
listing.reviews.push(newReview._id) //here push the newReview._id to the reviews array in a listing.
await listing.save()
res.json({review:newReview})

// .save() method is used for if we can any change make in the existing database.

}))


// delete reviews route 
router.delete('/:reviewId',wrapAsync(async(req,res)=>{

    const {id,reviewId} =req.params //fetching ids.
    await Listing.findByIdAndUpdate(id,{$pull:  {reviews:reviewId}})// deleted or removed from the listings
    await reviewModel.findByIdAndDelete(reviewId) //delete the review from the reviews model 
   res.json({sucess:true})
}))
export default router



