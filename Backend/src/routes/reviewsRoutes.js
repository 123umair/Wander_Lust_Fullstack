import express from 'express'
import { wrapAsync } from '../../utils/wrapAsync.js';
const router = express.Router({ mergeParams: true });
import { reviewModel } from '../Models/reviews.js';
import { Listing } from '../Models/Listing.js';
import { listingSchema, reviewSchemaValid } from '../../schemas/schema.js';
import { ExpressError } from '../../utils/ExpressError.js';
import { validateReviews } from '../middlewear/validationreviews.js';
import { createReview, destoryReviews } from '../Controllers/review.js';




// show reviews
router.post('/', validateReviews, wrapAsync(createReview))


// delete reviews route 
router.delete('/:reviewId', wrapAsync(destoryReviews))
export default router



