import bcrypt from "bcryptjs";
import { User } from "../../models/UserModel.js";
import crypto from 'crypto'
import { sendOtp } from "./Otp.js";


const OTP_EXPIRY_MS = 5 * 60 * 1000;
const RESEND_COOLDOWN_MS = 60 * 1000;
const GENERIC_MESSAGE = "If this email is registered, an OTP has been sent.";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const sendOtpToUser = async (req, res) => {
  try {
    const rawemail = req.body?.email;

    //Nosql injection protection

    if (typeof rawemail !== 'string' || !EMAIL_REGEX.test(rawemail.trim())) {
      return res.status(400).json({ message: "Valid email is required" });
    }



    const email = rawemail.trim().toLowerCase();

    const user = await User.findOne({ email });


    const oncooldown = user?.lastOtpSentAt && Date.now() - user.lastOtpSentAt.getTime() < RESEND_COOLDOWN_MS
    if (!user || oncooldown) {
      return res.status(200).json({ message: GENERIC_MESSAGE });
    }

    const otp = crypto.randomInt(100000, 1000000).toString();

    const hashOtp = await bcrypt.hash(otp, 10);
    user.resetOtp = hashOtp;
    user.otpExpires = Date.now() + OTP_EXPIRY_MS;
    user.IsOptVerified = false;
    user.lastOtpSentAt = new Date();
    user.otpAttempts = 0;
    await user.save();

    await sendOtp(email, otp);

    return res.status(200).json({ message: "opt send successfully" })

  } catch (error) {
    console.error("Failed to process OTP request:", error.message);

    return res.status(500).json({
      message: "Unable to process your request right now."
    });
  }
}

