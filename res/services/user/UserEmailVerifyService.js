import { OTPModel } from "../../models/user/OTPModel.js";
import { sendPasswordResetEmail } from "../../utility/EmailSender.js";

export const UserEmailVerifyService = async (req, model) => {
  try {
    let { email } = req.params;
    let user = await model.aggregate([{ $match: { email: email } }]);
    if (user.length > 0) {
      let otp = Math.floor(100000 + Math.random() * 900000);
      const expiresTime = new Date(Date.now() + 15 * 60 * 1000);
      await OTPModel.findOneAndUpdate(
        { email },
        { otp, status: 0, expiresTime },
        { upsert: true }
      );
      const optEmail = await sendPasswordResetEmail(email, otp);
      if (optEmail) {
        return { status: "success", response: "OTP sent successfully" };
      } else {
        return { status: "error", response: "Failed to send OTP. Try again." };
      }
    } else {
      return { status: "error", response: "User not found" };
    }
  } catch (error) {
    return { status: "error", response: error.message };
  }
};
