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
   

//     router.get('/check-auth',LoggedIn,(req,res)=>{
//         try {
//     console.log("USER:", req.user);
//    console.log("SESSION:", req.session);
//    console.log("AUTH:", req.isAuthenticated());
//    let user = req.user
//     console.log(user,'user verif')
//     res.json({success:true,user})
//         } catch (error) {
//             res.status(500).json({success:false,error: error.message})
//         }
   
//     })


    // the middlewear passport.authenticate() will want some perimeters. one is strategy(where we should use the localstrategy (but the strategy will used in templates like ejs tamplate but using the reactjs its will not use the strategy paremeter hre.),and one is if the user is not authenticated user than it will be redidrect toward login.)
    // local 1st perimeter,
    // {failureRedirect:'/login}, 2nd perimeter



 export default router
