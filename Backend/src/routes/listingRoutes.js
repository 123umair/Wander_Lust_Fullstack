import express from "express";
const router = express.Router();

import { Listing } from "../Models/Listing.js";
import { wrapAsync } from "../../utils/wrapAsync.js";
import { ExpressError } from "../../utils/ExpressError.js";
import { listingSchema } from "../../schemas/schema.js";
import { reviewModel } from "../Models/reviews.js";
import { LoggedIn } from "../middlewear/LoggedIn.js";
import passport from "passport";
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
  wrapAsync(async (req, res) => {
  
    const allListings = await Listing.find({});
    res.json({ allListings });
  })
);

// Create Route
router.post(
  "/create_listing",  
  validateListing,
  LoggedIn,
  wrapAsync(async(req, res) => {
    console.log("hitting the routes")
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.json({ success: true });
  })
);

// Show Route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate('reviews');
    if(!listing)
    {
     return res.json({success:false,message:"Listing you requested for doest not exist"})
    }
    return res.json({success:true, listing });
  })
);

// Edit Route
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.json({ listing });
  })
);

// Update Route
router.patch(
  "/:id",
  validateListing,
  LoggedIn,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    console.log(req.body,'request body')
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    res.json({ success: true, message: "Listing Updated Successfully!" });
  })
);

// Delete Route
router.delete(
  "/:id",
  LoggedIn,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.json({ success: true, message: "Deleted successfully" });
  })
);



// Review Route
// router.post('/:id/reviews',wrapAsync(async(req,res)=>{
//   const newreview = new reviewModel(req.body)
//   console.log(newreview,'my review')
// }))
export default router;




