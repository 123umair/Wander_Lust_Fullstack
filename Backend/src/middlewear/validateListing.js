import { ExpressError } from "../../utils/ExpressError.js";
import { listingSchema } from "../../schemas/schema.js";


// validation middleware
export const validateListing = (req, res, next) => {
    if (req.body.listing && req.body.listing.price) {
        req.body.listing.price = Number(req.body.listing.price);
    }
    const result = listingSchema.safeParse(req.body);
    if (!result.success) {
        const errorMsg = result.error.issues.map((el) => el.message).join(", ");
        return next(new ExpressError(400, errorMsg));
    }
    req.body = result.data;
    next();
};
