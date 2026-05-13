import mongoose from 'mongoose'
import {Schema} from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'


const userSchema = new Schema({
    emial:{
        type:String,
        required:true
    }
})


// we cannot add the username field and password (hashing,salting) because passport-local-mongoose will default added the username field also and a password and add also some methods in the our instance creating from the schema therefore we can avoid it from creating from the scratch.
User.plugin(passportLocalMongoose)

export const User = mongoose.model('User',userSchema) 