import express from "express";
const router = express.Router();
import { wrapAsync } from "../../utils/wrapAsync.js";
import { validateListing } from "../middlewear/validateListing.js";
import { LoggedIn } from "../middlewear/LoggedIn.js";
import multer from 'multer';
import { storage } from "../../cloudConfig.js";
const upload = multer({ storage });  // now here by this line the multer will stored the file in the cloudinary storage

import { indexListing, showListing, createListing, editListing, updateListing, deleteListing } from "../Controllers/listing.js";


// Index Route
router.get(
  "/",
  wrapAsync(indexListing)
);

// Create Route
router.post(
  "/create_listing",
  LoggedIn,
  upload.single('listing[image]'), // multer add the image in the cloudinary."uplaod" is a multer instance that will connect cloudinary storage and "single()" will tells to express that only one file coming throught the route from the frontend.
  validateListing,
  wrapAsync(createListing),
);


router.route("/:id")
  .get(wrapAsync(showListing))
  .patch(LoggedIn,
    upload.single('listing[image]'), validateListing, wrapAsync(updateListing))
  .delete(LoggedIn, wrapAsync(deleteListing))


// Edit Route
router.get(
  "/:id/edit",
  LoggedIn,
  wrapAsync(editListing)
);




// Review Route
// router.post('/:id/reviews',wrapAsync(async(req,res)=>{
//   const newreview = new reviewModel(req.body)
//   console.log(newreview,'my review')
// }))
export default router;




