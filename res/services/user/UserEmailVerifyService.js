import { OTPModel } from "../../models/User/OTPModel.js";
import { SendMail } from "../../utility/EmailSender.js";

export const UserEmailVerifyService = async (req, model) => {
  try {
    let { email } = req.params;
    let user = await model.aggregate([{ $match: { email: email } }]);
    if (user.length > 0) {
      let otp = Math.floor(100000 + Math.random() * 900000);
      await OTPModel.findOneAndUpdate(
        { email },
        { otp, status: 0, expiresTime: Date.now() },
        { upsert: true }
      );
      await SendMail(
        email,
        "OTP Request",
        `Your requested otp is ${otp} and will be expiring in 5 minutes.`
      );
      return { status: "success", response: "OTP sent successfully" };
    } else {
      return { status: "error", response: "User not found" };
    }
  } catch (error) {
    return { status: "error", response: error.message };
  }
};
