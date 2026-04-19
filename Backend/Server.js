import express from 'express'
import cors from 'cors'
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 4000;
const app = express()
import { ExpressError } from './utils/ExpressError.js'
app.use(express.json())
app.use(express.urlencoded({extended:true}))
 // means that if any type of data that are urlencoded formate then this middleware easily parse these data inside the req.body for understand the data
import { connectDB } from './src/config/db.js'
import listingRoutes from "./src/routes/listingRoutes.js";
import reviewRoutes from './src/routes/reviewsRoutes.js'
 
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

app.use('/listings',listingRoutes)
app.use('/listings',reviewRoutes)
app.all(`/*splat`,(req,res,next) => {  
   next(new ExpressError(404,"Page Not Found!"))          // here we created the express error 
})                            

app.use((err,req,res,next)=>{
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid ID format' });}
   let {statusCode=500,message="Something went wrong!"} = err;       // and here the middleware will catch these error .
    res.status(statusCode).json({ error: message })
})
