import mongoose from 'mongoose'
import {Schema} from 'mongoose'

// import passportLocalMongoose from "passport-local-mongoose";
import pkg from 'passport-local-mongoose'

const passportLocalMongoose = pkg.default || pkg

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    }
})


// we cannot add the username field and password (hashing,salting) because passport-local-mongoose will default added the username field also and a password and add also some methods in the our instance creating from the schema therefore we can avoid it from creating from the scratch.
userSchema.plugin(passportLocalMongoose)

export const User = mongoose.model('User',userSchema) 