import express from "express";
const router = express.Router();
import { wrapAsync } from "../../utils/wrapAsync.js";
import { ExpressError } from "../../utils/ExpressError.js";
import { listingSchema } from "../../schemas/schema.js";
import { LoggedIn } from "../middlewear/LoggedIn.js";
import multer from 'multer';
import { storage } from "../../cloudConfig.js";
const upload = multer({ storage });  // now here by this line the multer will stored the file in the cloudinary storage

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


router.route("/:id")
  .get(wrapAsync(showListing))
  .patch(validateListing, LoggedIn, wrapAsync(updateListing))
  .delete(LoggedIn, wrapAsync(deleteListing))


// Edit Route
router.get(
  "/:id/edit",
  wrapAsync(editListing)
);




// Review Route
// router.post('/:id/reviews',wrapAsync(async(req,res)=>{
//   const newreview = new reviewModel(req.body)
//   console.log(newreview,'my review')
// }))
export default router;




