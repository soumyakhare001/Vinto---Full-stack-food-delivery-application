import bcrypt from "bcryptjs";
import { User } from "../../models/UserModel.js";


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const verifyOtp = async (req, res) => {
    try {
           console.log("VERIFY OTP CONTROLLER HIT");
        const rawemail = req.body?.email;
        const rawOtp = req.body?.Otp;
        if (typeof rawemail !== 'string' || !EMAIL_REGEX.test(rawemail.trim())) {
            return res.status(400).json({ message: "Valid email is required" });
        }
        if (typeof rawOtp !== "string" || !/^\d{6}$/.test(rawOtp)) {
            return res.status(400).json({
                message: "Invalid"
            });
        }
        const email = rawemail.trim().toLowerCase();
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "invalid"
            });

        }
        if (!user.otpExpires || Date.now() > user.otpExpires.getTime()) {
            return res.status(400).json({
                message: "invalid"
            });
        }

        if (!user.resetOtp || !user.otpExpires) {
            return res.status(400).json({
                message: "Invalid"
            });
        }
        console.log("OTP hash exists:", !!user.resetOtp);
        console.log("OTP attempts:", user.otpAttempts);

        const ismatch = await bcrypt.compare(rawOtp, user.resetOtp);
        console.log("OTP match:", ismatch);
        const MAX_OTP_ATTEMPTS = 5;

        if (user.otpAttempts >= MAX_OTP_ATTEMPTS) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }
        console.log("OTP hash exists:", !!user.resetOtp);
        console.log("OTP attempts:", user.otpAttempts);
        console.log("Verified:", user.IsOptVerified);
        if (!ismatch) {

            user.otpAttempts += 1;
            if (user.otpAttempts >= MAX_OTP_ATTEMPTS) {
                user.resetOtp = undefined;
                user.otpExpires = undefined;
                user.IsOptVerified = false;


            }
            await user.save();
            return res.status(400).json({ message: "invalid or expired otp " })
        }



        user.IsOptVerified = true;
        user.resetOtp = undefined;

        user.otpExpires = undefined;
        user.otpAttempts = 0;
        await user.save();


        return res.status(200).json({ message: "otp verify successfully" });

    }
    catch (error) {

        console.log("Backend message:", error.response?.data);
        console.log("Status:", error.response?.status);

        return res.status(500).json({ message: "otp error" });
    }
}

export const resetPassword = async (req, res) => {
    try {

        const { email: rawemail, Newpassword } = req.body ?? {};

        if (typeof rawemail !== 'string' || !EMAIL_REGEX.test(rawemail.trim())) {
            return res.status(400).json({ message: "Valid email is required" });
        }

        const email = rawemail.trim().toLowerCase();
        const user = await User.findOne({ email });

        if (!user || !user.IsOptVerified) {
            return res.status(400).json({
                message: "invalid"
            });

        }
        if (typeof Newpassword != "string" || Newpassword.length < 6) {
            return res.status(400).json({ message: "password atleast must be of 6 character" });
        }

        const hasspassword = await bcrypt.hash(Newpassword, 10);
        user.password = hasspassword;
        user.resetOtp = undefined;
        user.otpExpires = undefined;
        user.otpAttempts = 0;
        user.IsOptVerified = false;
        await user.save();
        return res.status(200).json({
            message: "successful"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed"
        });
    }
}