import { reviewSchemaValid } from '../../schemas/schema.js';
import { ExpressError } from '../../utils/ExpressError.js';

export const validateReviews = (req, res, next) => {
    const result = reviewSchemaValid.safeParse(req.body.review)
    if (!result.success) {
        const errorMsg = result.error.issues.map((el) => el.message).join(", ");
        return next(new ExpressError(400, errorMsg))
    }
    req.body = result.data
    next()
}
