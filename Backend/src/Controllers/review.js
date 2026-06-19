import { reviewModel } from "../Models/reviews.js";
import { Listing } from "../Models/Listing.js";
import { reviewModel } from '../Models/reviews.js'


// create reviews
export const createReview = async (req, res) => {
    const listing = await Listing.findById(req.params.id) //find out the listing where request the reviews.
    const newReview = new reviewModel(req.body.review)
    newReview.author = req.user._id // this is important
    await newReview.save()
    listing.reviews.push(newReview._id) //here push the newReview._id to the reviews array in a listing.
    await listing.save()
    // 🔥 FIXED: Frontend ko bhejne se pehle author ko populate karein
    await newReview.populate("author");
    res.json({ review: newReview })
    console.log('review', newReview)
    // .save() method is used for if we can any change make in the existing database.
}

// delete reviews
export const destoryReviews = async (req, res) => {
    const { id, reviewId } = req.params //fetching ids.
    let review = await reviewModel.findById(reviewId)
    if (!review.author._id.equals(req.user._id)) {
        return res.status(403).json({ success: false, message: "Your not the author of this review." })
    }
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })// deleted or removed from the listings
    await reviewModel.findByIdAndDelete(reviewId) //delete the review from the reviews model 
    res.json({ sucess: true })
}