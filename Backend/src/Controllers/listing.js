import { Listing } from "../Models/Listing.js";
import axios from 'axios'
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

    // Default empty geometry data
    let lat = 33.6844; // 🔥 Default: Islamabad/Pakistan safe coordinates agar sab fail ho jaye
    let lng = 73.0479;
    // 🌟 NEW: Create ke waqt hi coordinates fetch karo
    if (req.body.listing && req.body.listing.location) {
        try {
            const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(req.body.listing.location)}&limit=1`;
            const geoResponse = await axios.get(geoUrl, {
                headers: { "User-Agent": "WanderlustApp/2.0 (uk685994@gmail.com)" }
            });

            if (geoResponse.data && geoResponse.data.length > 0) {
                lat = parseFloat(geoResponse.data[0].lat);
                lng = parseFloat(geoResponse.data[0].lon);
            }
            else {
                // Backup Try: Agar pehla fail ho toh country ke sath try karein
                const backupUrl = `https://nominatim.openstreetmap.org/search?format=json&city=${encodeURIComponent(req.body.listing.location)}&country=${encodeURIComponent(req.body.listing.country || "")}&limit=1`;
                const backupResponse = await axios.get(backupUrl, { headers: { "User-Agent": "WanderlustUltimateApp/2.0" } });

                if (backupResponse.data && backupResponse.data.length > 0) {
                    lat = parseFloat(backupResponse.data[0].lat);
                    lng = parseFloat(backupResponse.data[0].lon);
                }
            }
        } catch (geoErr) {
            console.log("Geocoding failed during creation:", geoErr.message);
        }
    }

    const url = req.file.path; // cloudinary secure url
    const filename = req.file.filename // cloudinary public id filename
    const newListingData = {
        ...req.body.listing,
        image: { url, filename },
        geometry: { lat, lng },
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
// 📁 In your backend controller (updateListing)

export const updateListing = async (req, res) => {
    const { id } = req.params;

    if (!req.body.listing) {
        return res.status(400).json({ success: false, message: "Listing data is required" });
    }


    let updateData = {
        title: req.body.listing.title,
        description: req.body.listing.description,
        price: Number(req.body.listing.price) || 0,
        location: req.body.listing.location,
        country: req.body.listing.country,
    };

    // 2. GEOMETRY/MAP LOGIC: Jab user location edit karega
    if (req.body.listing.location) {
        try {
            const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(req.body.listing.location)}&limit=1`;

            const geoResponse = await axios.get(geoUrl, {
                headers: {
                    "User-Agent": "WanderlustUltimateApp/2.0 (umair@gmail.com)"
                }
            });

            if (geoResponse.data && geoResponse.data.length > 0) {
                updateData.geometry = {
                    lat: parseFloat(geoResponse.data[0].lat),
                    lng: parseFloat(geoResponse.data[0].lon)
                };
            }
        } catch (geoErr) {
            console.log("Geocoding failed during edit update:", geoErr.message);
        }
    }

    // 3. DATABASE UPDATE: Pehle text aur map coordinates ko update karein
    // { new: true } lagane se hume updated document wapas milega
    const listing = await Listing.findByIdAndUpdate(id, updateData, { new: true });

    if (!listing) {
        return res.status(404).json({ success: false, message: "Listing not found" });
    }

    // 4. IMAGE HANDLING: Agar user ne Nayi Image upload ki hai, sirf tabhi image badlegi
    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
        await listing.save(); // Agar nayi image hai toh database me save ho jayegi
    }
    //  Agar req.file nahi aati, toh listing.image database me purani wali hi barkarar rahegi!

    res.json({ success: true, message: "Listing Updated Successfully!" });
};


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