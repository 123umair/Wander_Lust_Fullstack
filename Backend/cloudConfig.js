import dotenv from 'dotenv'
dotenv.config()

import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'


// configuration setup 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// setup sotrage
// 2. Storage Setup (Modern params structure)
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'WanderLust_DEV',
        allowed_formats: ['png', 'jpg', 'jpeg'],
    },
});

export { cloudinary, storage };