import express from 'express'
import cors from 'cors'
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 4000;
import { Listing } from './src/Models/Listing.js'
const app = express()
import { wrapAsync } from './utils/wrapAsync.js'
import { ExpressError } from './utils/ExpressError.js'
app.use(express.json())
app.use(express.urlencoded({extended:true}))
 // means that if any type of data that are urlencoded formate then this middleware easily parse these data inside the req.body for understand the data
 import { connectDB } from './src/config/db.js'
 import { listingSchema } from './schemas/schema.js'
 
 const frontendOrigin = process.env.FRONTEND_URL;
 if (!frontendOrigin) {
     throw new Error("FRONTEND_URL is required for CORS configuration");
}
 app.use(cors({ origin: frontendOrigin}));

// connect database

const startServer=async()=>{
  await connectDB();
  app.listen(port,()=>{
   console.log('Server is running on port',port)
  })
}
startServer().catch((err)=>{
   console.error("Server Start Up failed:",err.message)
   process.exit(1)
})


// convert validation schema to middlewear
const validateListing = (req,res,next)=>{
   const result = listingSchema.safeParse(req.body);
  if (!result.success) {
     const errorMsg = result.error.issues.map((el) => el.message).join(", ");
     return next(new ExpressError(400, errorMsg));
   }
  req.body = result.data;
   return next();
 }


// Index Route
app.get("/listings",wrapAsync(async(req, res) => {
   const allListings = await Listing.find({})
   res.json({allListings})
}))



// New Route
app.post("/listings/create_listing",validateListing,wrapAsync(async(req,res,next)=>{
 
   const newListing = new Listing(req.body.listing)
   await newListing.save()
   res.json('success')   
}))

// Show Route
app.get("/listings/:id",wrapAsync(async (req,res)=>{
   let { id } = req.params
   const listing = await Listing.findById(id)
   res.json({listing})
}))

// Edit Route
app.get("/listings/:id/edit", wrapAsync(async(req,res)=>{
   let { id } = req.params;
   const listing = await Listing.findById(id)
   res.json({ listing })
   
}))

// Update Route
app.patch("/listings/:id", validateListing,wrapAsync(async (req, res) => {
   
   let { id } = req.params;
   await Listing.findByIdAndUpdate(
      id,
      { ...req.body.listing }
   );

   res.json({success:true,message:"Listing Updated Successfully!"})
}));

// Delete Route
app.delete("/listings/:id", wrapAsync(async (req,res) =>{
   let { id } = req.params
   await Listing.findByIdAndDelete(id)
   res.json({success:true,message:"Deleted successfully"})
}))


app.all(`/*splat`,(req,res,next) => {  
   next(new ExpressError(404,"Page Not Found!"))          // here we created the express error 
})                            

app.use((err,req,res,next)=>{
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid ID format' });}
   let {statusCode=500,message="Something went wrong!"} = err;       // and here the middleware will catch these error .
    res.status(statusCode).json({ error: message })
})
