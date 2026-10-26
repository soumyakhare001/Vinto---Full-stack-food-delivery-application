import mongoose from "mongoose";

export const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DATABASE GOT CONNECTED");
    } catch (error) {
        console.log("DATABASE CONNECTION FAILED");
        
    }
}