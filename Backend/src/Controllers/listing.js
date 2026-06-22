import { Listing } from "../Models/Listing.js";

// index listings 
export const indexListing = async (req, res) => {

    const allListings = await Listing.find({}).populate("reviews");
    res.json({ allListings });
}


// Create logic
export const createListing = async (req, res) => {
    // 1. Extract the data from the Cloudinary.
    if (!req.file) {
        return res.status(400).json({ message: 'Image upload is required.' })
    }

    const url = req.file.path; // cloudinary secure url
    const filename = req.file.filename // cloudinary public id filename
    const newListingData = {
        ...req.body.listing,
        image: { url, filename },
        Owner: req.user._id
    };
    const newListing = new Listing(newListingData)
    await newListing.save();
    return res.status(201).json({ success: true });
}

// show listing
export const showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate('reviews')
        .populate("Owner")
        .populate({
            path: "reviews",
            populate: { path: 'author' } // Yeh reviews ke andar ghus kar author ka naam nikalega (nested populate)
        })

    if (!listing) {
        return res.json({ success: false, message: "Listing you requested for doest not exist" })
    }
    return res.json({ success: true, listing });
}


// edit listing (Logic)
export const editListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.json({ listing });
}

// update listing (Logic)
export const updateListing = async (req, res) => {
    const { id } = req.params;
    console.log(req.body, 'request body')
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.json({ success: true, message: "Listing Updated Successfully!" });
}


// delete listing (Logic)
export const deleteListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id) // extract listing from the database

    // 2. CHECK LOGIC: req.user._id ko listing.Owner se compare karein
    if (!listing.Owner.equals(req.user._id)) {
        return res.status(403).json({
            success: false,
            message: "Your are not authorized"
        })
    }
    // Mongoose ObjectIDs ko compare karne ke liye '.equals()' use hota hai
    await Listing.findByIdAndDelete(id);
    res.json({ success: true, message: "Deleted successfully" });
}