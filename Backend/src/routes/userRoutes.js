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
    //plugin of passport-local-mongoose, hashing the password,verifies if the username is already taken,creates and saves the new user document with the generated hash and salt fields 
    // 2. Log the user in directly using Passport's req.login()
    // Log the user in directly using Passport's req.login()
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err); 
            }
            // Send the response ONLY after the session is successfully written
            return res.json({ success: true, message: "user registered", registeredUser });
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({error:err.message})
    }
    }))


    //passport.authenticate() is a middlwear where  he can authenticate the user that it will exist in the database or not therefore for the database work we also use the async methods.
    
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
       
       
        let user = req.user 
        console.log(user,'user checking') 
        console.log('SESSION',req.session)
        res.json({success:true,user}) })

    router.post('/logedout',(req,res)=>{
            console.log("Before logout:", req.user);
        req.logout((err)=>{
        if(err){
            return res.status(500).json({message:'Logout Failed'})
        }


     // Express-Session ko pure tarike se database/memory se mitao
        req.session.destroy((destroyErr) => {
            if (destroyErr) {
                return res.status(500).json({ success: false, message: "Could not destroy session" });
            }

            // Browser se session cookie ko remove karo
            res.clearCookie("connect.sid", {
                path: '/',
                httpOnly: true,
                sameSite: 'lax'
            })


            res.clearCookie("connect.sid")
            return res.json({success:true,message:'user is loggedout'})
        })

    }
)



    })


 export default router
