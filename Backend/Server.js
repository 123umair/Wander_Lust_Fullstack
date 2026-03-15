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
app.use(cors({ origin: process.env.FRONTEND_URL }));
import { connectDB } from './src/config/db.js'
import { listingSchema } from './schemas/schema.js'


// connect database
connectDB();


// convert validation schema to middlewear
const validateListing = (req,res,next)=>{
   const { error } = listingSchema.parse(req.body)
   if (error)
   {
      let errorMsg =error.details.map((el)=>el.message).join(",")
      throw new ExpressError(400,errorMsg)
   }
   else{
      next()
   }
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



 app.listen(port,()=>{
    console.log("Server running on port",port)
 })