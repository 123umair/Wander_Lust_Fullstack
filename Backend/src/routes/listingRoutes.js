import express from "express";
const router = express.Router();
import { wrapAsync } from "../../utils/wrapAsync.js";
import { ExpressError } from "../../utils/ExpressError.js";
import { listingSchema } from "../../schemas/schema.js";
import { LoggedIn } from "../middlewear/LoggedIn.js";

import { indexListing, showListing, createListing, editListing, updateListing, deleteListing } from "../Controllers/listing.js";
// validation middleware
const validateListing = (req, res, next) => {
  const result = listingSchema.safeParse(req.body);
  if (!result.success) {
    const errorMsg = result.error.issues.map((el) => el.message).join(", ");
    return next(new ExpressError(400, errorMsg));
  }
  req.body = result.data;
  next();
};



// Index Route
router.get(
  "/",
  wrapAsync(indexListing)
);

// Create Route
router.post(
  "/create_listing",
  validateListing,
  LoggedIn,
  wrapAsync(createListing)
);

// Show Route
router.get(
  "/:id",
  wrapAsync(showListing)
);

// Edit Route
router.get(
  "/:id/edit",
  wrapAsync(editListing)
);

// Update Route
router.patch(
  "/:id",
  validateListing,
  LoggedIn,
  wrapAsync(updateListing)
);

// Delete Route
router.delete(
  "/:id",
  LoggedIn,
  wrapAsync(deleteListing)
);



// Review Route
// router.post('/:id/reviews',wrapAsync(async(req,res)=>{
//   const newreview = new reviewModel(req.body)
//   console.log(newreview,'my review')
// }))
export default router;




