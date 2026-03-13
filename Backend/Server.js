import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { Listing } from './src/Models/Listing.js'
const app = express()
const port = 4000
import { wrapAsync } from './utils/wrapAsync.js'
import { ExpressError } from './utils/ExpressError.js'
app.use(express.json())
app.use(express.urlencoded({extended:true}))
 // means that if any type of data that are urlencoded formate then this middleware easily parse these data inside the req.body for understand the data
app.use(cors({origin:"http://localhost:5173"}));


async function main(){
      await  mongoose.connect("mongodb://127.0.0.1:27017/wanderLust") 
 }

main()
.then(()=>{
    console.log("Connection is successfull")
})

// Index Route
app.get("/listings",wrapAsync(async(req, res) => {
  
   const allListings = await Listing.find({})
   res.json({allListings})
}))

// New Route
app.post("/listings/create_listing",wrapAsync(async(req,res,next)=>{
    if(!req.body.listing){
   throw new ExpressError(400,"Send valid data for listing.")   // ager client side sy koi data aisy bejy k jis may 'listing' object hi mawjood na ho tho ye error ayega just try it on post man or hopscotch
   }
   const newListing = new Listing(req.body.listing)
   await newListing.save()
   res.json('success')   
}))

// Show Route
app.get("/listings/:id", wrapAsync(async (req,res)=>{
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
app.patch("/listings/:id", wrapAsync(async (req, res) => {
    if(!req.body.listing){
      throw new ExpressError(400,"Send valid data for listing.") }
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
   let {statusCode=500,message="Something went wrong!"} = err;       // and here the middleware will catch these error .
   res.status(statusCode).send(message)
})



 app.listen(port,()=>{
    console.log("Server running on port")
 })