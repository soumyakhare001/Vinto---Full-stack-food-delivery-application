import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
console.log("EMAIL:", JSON.stringify(process.env.EMAIL));
console.log("PASS length:", process.env.PASS?.length);
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port:465,
  secure:true,
  auth: {
    user:process.env.EMAIL,
    pass:process.env.PASS,
  },
});

// export const testEmailConnection = async () => {
//   try {
//     await transporter.verify();
//     console.log("Gmail SMTP connection verified!");
//   } catch (error) {
//     console.log("Error code:", error.code);
//     console.log("Response:", error.response);
//     console.log("Response code:", error.responseCode);
//   }
// };

// console.log("Email loaded:", Boolean(process.env.EMAIL));
// console.log("Password loaded:", Boolean(process.env.PASS));
// console.log("Email looks valid:", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(process.env.EMAIL || ""));
// console.log("Password length:", process.env.PASS?.length);


export const sendOtp=async(to,otp)=>{
  await transporter.sendMail({
    from:process.env.EMAIL,
    to,
    subject:"Reset Your Password",
    html:`<p>Your OTP for Password reset is <b>${otp}</b></br>. it expires in 5 mintues.</p>`
  })
}