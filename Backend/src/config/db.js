import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.ATLASDB_URL) {
      throw new Error("MONGO_URI is not set");
    }
    await mongoose.connect(process.env.ATLASDB_URL);
    console.log("✅ MongoDB Connected Successfully");

  }
  catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};