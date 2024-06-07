export const UserOTPVerifyService = async (req, model) => {
  try {
    let { email, otp } = req.params;

    const currentDateTime = new Date();

    let userOTP = await model.aggregate([
      { $match: { email: email, otp: otp, status: 0 } },
      {
        $addFields: {
          isExpired: {
            $lt: ["$expiresTime", currentDateTime],
          },
        },
      },
      { $match: { isExpired: false } },
    ]);

    if (userOTP.length > 0) {
      await model.findOneAndUpdate({ email, otp, status: 0 }, { status: 1 });
      return { status: "success", response: "OTP verified successfully" };
    } else {
      return {
        status: "warning",
        response: "Invalid or expired OTP. Try again.",
      };
    }
  } catch (error) {
    return {
      status: "error",
      response: error.message,
    };
  }
};
