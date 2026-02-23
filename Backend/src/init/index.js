import mongoose from "mongoose";
import data from "./data.js";
import { Listing } from '../Models/Listing.js'




async function main(){
      await  mongoose.connect("mongodb://127.0.0.1:27017/wanderLust") 
 }

main()
.then(()=>{
    console.log("Connection is successfull")
})

const initData = data



const initDb = async() =>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data)
    console.log("data was initialized")
}

initDb()