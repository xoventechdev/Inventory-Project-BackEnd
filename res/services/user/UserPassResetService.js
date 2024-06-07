import { OTPModel } from "../../models/User/OTPModel.js";
import bcrypt from "bcrypt";

export const UserPassResetService = async (req, model) => {
  try {
    let { email, otp, newPass } = req.body;
    let usedOTP = await OTPModel.aggregate([
      { $match: { email: email, otp: otp, status: 1 } },
    ]);
    if (usedOTP.length > 0) {
      let hash = await bcrypt.hash(newPass, 10);
      await model.findOneAndUpdate({ email }, { password: hash });
      return { status: "success", response: "Password reset successfully" };
    } else {
      return { status: "warning", response: "Invalid request. Try again." };
    }
  } catch (error) {
    return { status: "error", response: error.message };
  }
};
