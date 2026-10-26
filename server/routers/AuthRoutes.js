import express from 'express';
import { SignUp } from '../controllers/AuthControllers/SignUp.js';
import { Login } from '../controllers/AuthControllers/Login.js';
import { Logout } from '../controllers/AuthControllers/Logout.js';



import { sendOtpToUser } from '../controllers/AuthControllers/sendOtp.js';
import { resetPassword, verifyOtp } from '../controllers/AuthControllers/verifyOtp.js';




const authRouter = express.Router();

authRouter.post('/signup', SignUp);
authRouter.post('/login', Login);
authRouter.get('/logout', Logout);
authRouter.post('/sendotp', sendOtpToUser);
authRouter.post('/verifyotp',verifyOtp);
authRouter.post('/resetpassword',resetPassword);


export default authRouter;