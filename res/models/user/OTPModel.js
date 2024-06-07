import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    expiresTime: {
      type: Date,
      default: Date.now,
      expires: 60 * 5,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const OTPModel = mongoose.model("otp", otpSchema);
