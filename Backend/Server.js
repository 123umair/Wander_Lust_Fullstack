import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { Listing } from './src/Models/Listing.js'
const app = express()
const port = 4000

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
app.get("/listings",async(req, res) => {
   const allListings = await Listing.find({})
   res.json({allListings})
})

// New Route
app.post("/listings/create_listing",async(req,res)=>{
//   const  {title,description,price,country,location} = req.body
// let listing = req.body.listing;
const newListing = new Listing(req.body.listing)
await newListing.save()
res.redirect("http://localhost:5173")

})

// Show Route
app.get("/listings/:id", async (req,res)=>{
   let { id } = req.params
   const listing = await Listing.findById(id)
   res.json({listing})
})

// Update Route
app.patch("/listings/:id/edit", async(req,res)=>{

   
})

//  app.get("/itemslisting",async (req,res)=>{
//     let sampleListing = new Listing({
//         title:"Naran,Kaghan valley",
//         description:"Located in Pakistan called the switzerland of Pakistan..",
//         price:899,
//         location:"Pakistan",
//         country:"Pakistan"
//     });
//    await sampleListing.save();
//     console.log("sample was saved");
//     res.send("Successfull testing")
//  })

 app.listen(port,()=>{
    console.log("Server running on port")
 })