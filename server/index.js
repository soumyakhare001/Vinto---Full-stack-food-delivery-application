import dotenv from 'dotenv'
import express from 'express'

import { connectDb } from './config/ConnectDb.js';
import cookieParser from 'cookie-parser';
import authRouter from './routers/AuthRoutes.js';
// import { testEmailConnection } from "./controllers/AuthControllers/Otp.js";
import cors from 'cors'
dotenv.config();
const app=express();
// testEmailConnection();
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRouter);
const port=process.env.PORT||5000

app.get('/',(req,res)=>{
    res.send("hello world");
})

app.listen(port,()=>{
    console.log(`listening to the port ${port}`);
    connectDb();
})