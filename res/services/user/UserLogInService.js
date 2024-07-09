import { EncodeToken } from "../../utility/AuthHelper.js";
import bcrypt from "bcrypt";

export const UserLogInService = async (req, model) => {
  try {
    let user = await model.findOne({ email: req.body.email });
    if (user) {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isPasswordValid) {
        let token = EncodeToken(user.email);
        return {
          status: "success",
          token: token,
          response: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            mobile: user.mobile,
            photo: user.photo,
          },
        };
      } else {
        return {
          status: "warning",
          response: "Wrong password. Please, try with a valid password.",
        };
      }
    } else {
      return {
        status: "warning",
        response: "User is not registered with this email address.",
      };
    }
  } catch (error) {
    return { status: "error", response: error.message };
  }
};
