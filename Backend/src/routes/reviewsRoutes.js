import express from 'express'
import { wrapAsync } from '../../utils/wrapAsync.js';
const router = express.Router({ mergeParams: true });
import { validateReviews } from '../middlewear/validationreviews.js';
import { createReview, destoryReviews } from '../Controllers/review.js';




// show reviews
router.post('/', validateReviews, wrapAsync(createReview))


// delete reviews route 
router.delete('/:reviewId', wrapAsync(destoryReviews))
export default router



