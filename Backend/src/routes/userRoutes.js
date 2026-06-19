import express from 'express'
import { wrapAsync } from '../../utils/wrapAsync.js'
import passport from 'passport'
const router = express.Router()
import { LoggedIn } from '../middlewear/LoggedIn.js'
import { loginUser, logOutUser, authUser, createUser } from '../Controllers/user.js'




router.post('/signup', wrapAsync(createUser))


//passport.authenticate() is a middlwear where  he can authenticate the user that it will exist in the database or not therefore for the database work we also use the async methods.

router.post('/login',
    passport.authenticate('local'),
    wrapAsync(loginUser))

router.get('/check-auth', LoggedIn, authUser)

router.post('/logedout', LoggedIn, logOutUser)


export default router
