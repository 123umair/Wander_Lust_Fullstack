import express from 'express'
import { User } from '../Models/user.js'
import { wrapAsync } from '../../utils/wrapAsync.js'
const router = express.Router()

router.post('/signup',wrapAsync(async(req,res)=>{
try {
    let {username,email,password} = req.body
   const newUser =  new User({username,email})
   const registeredUser = await   User.register(newUser,password)
   res.json({success:true,message:"user registered"})
} catch (error) {
    console.log(error)
    res.status(500).json({error:err.message})
}
}))


export default router