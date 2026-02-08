import express from 'express'
import cors from 'cors'

const app = express()
const port = 4000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
 // means that if any type of data that are urlencoded formate then this middleware easily parse these data inside the req.body for understand the data
 




 app.listen(port,()=>{
    console.log("Server running on port")
 })