import mongoose from "mongoose";

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust")
}

main()
    .then(() => {
        console.log("Connection is successfull")
    })


