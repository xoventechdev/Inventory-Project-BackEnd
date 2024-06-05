import { DecodeToken } from "../utility/AuthHelper.js"; // Make sure the path is correct
import JWT from "jsonwebtoken";

export const AuthVerified = (req, res, next) => {
  let token = req.headers.token;
  if (!token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      status: "warning",
      message: "You are unauthorized. Please, try with a valid token.",
    });
  }

  try {
    const decoded = DecodeToken(token);
    req.email = decoded.email;
    req.user_id = decoded.user_id;
    next();
  } catch (error) {
    if (error instanceof JWT.TokenExpiredError) {
      return res.status(401).json({
        status: "warning",
        message: "Your token has expired. Please, login again.",
      });
    } else if (error instanceof JWT.JsonWebTokenError) {
      return res.status(401).json({
        status: "warning",
        message: "You are unauthorized. Please, try with a valid token.",
      });
    } else {
      return res.status(500).json({
        status: "error",
        message:
          "An error occurred during token verification. Please, try again later.",
      });
    }
  }
};
