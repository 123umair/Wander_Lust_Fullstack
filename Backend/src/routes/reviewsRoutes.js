import express from 'express'
import { wrapAsync } from '../../utils/wrapAsync.js';
const router = express.Router();
import { reviewModel } from '../Models/reviews.js';
import { Listing } from '../Models/Listing.js';
import { reviewSchemaValid } from '../../schemas/schema.js';
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
router.post('/:id/reviews',validateReviews,wrapAsync(async(req,res)=>{
const listing = await Listing.findById(req.params.id) //find out the listing where request the reviews.
const newReview = new reviewModel(req.body.review)
listing.reviews.push(newReview)
await newReview.save()
await listing.save()
res.json({review:newReview})

// .save() method is used for if we can any change make in the existing database.

}))
export default router

