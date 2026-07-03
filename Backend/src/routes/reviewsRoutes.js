import express from 'express'
import { wrapAsync } from '../../utils/wrapAsync.js';
const router = express.Router({ mergeParams: true });
import { validateReviews } from '../middlewear/validationreviews.js';
import { createReview, destoryReviews } from '../Controllers/review.js';
import { LoggedIn } from '../middlewear/LoggedIn.js';



// show reviews
router.post('/', LoggedIn, validateReviews, wrapAsync(createReview))


// delete reviews route 
router.delete('/:reviewId', LoggedIn, wrapAsync(destoryReviews))
export default router



