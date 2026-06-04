    import express from 'express'
    import { User } from '../Models/user.js'
    import { wrapAsync } from '../../utils/wrapAsync.js'
    import passport from 'passport'
    const router = express.Router()
    import { LoggedIn } from '../middlewear/LoggedIn.js'
    router.post('/signup',wrapAsync(async(req,res)=>{
    try {
        let {username,email,password} = req.body
    const newUser =  new User({username,email})
    const registeredUser = await User.register(newUser,password)
    res.json({success:true,message:"user registered"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:err.message})
    }
    }))


    //passport.authenticate() is a middlwear where  he can authenticate the user that it will exist in the database or not therefore for the database work we also use the async methods.
    // addded user in the database only 
    router.post('/login',
        passport.authenticate('local'),
        wrapAsync(async(req,res)=>{
        try {
       
            res.json({sucess:true,message:"Acount Login Successfull",user:req.user})

        } catch (error) {
            console.log('error',error)
        }
    }))
   
router.get('/check-auth',LoggedIn,(req,res)=>{ 
    console.log("USER:", req.user);
    console.log("SESSION:", req.session); 
    console.log("AUTH:", req.isAuthenticated()); 
    let user = req.user 
    console.log(user,'user checking') 
    res.json({success:true,user}) })




 export default router
