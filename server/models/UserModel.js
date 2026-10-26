import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String

  },
  mobile: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "owner", "deliveryBoy"]
    
  },
  resetOtp: {
    type: String
  },
  IsOptVerified: {
    type: Boolean,
    default: false
  },
  otpExpires: {
    type: Date
  },
  lastOtpSentAt: {
    type: Date,
    default: null
  },
  otpAttempts: {
  type: Number,
  default: 0,
}
}, { timestamps: true })

export const User = mongoose.model("User", UserSchema);