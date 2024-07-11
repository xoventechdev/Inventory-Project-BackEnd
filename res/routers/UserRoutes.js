import { Router } from "express";
import {
  UserOTPVerify,
  UserCreate,
  UserDetails,
  UserEmailVerify,
  UserLogIn,
  UserPassReset,
  UserUpdate,
} from "../controllers/UserControllers.js";
import { AuthVerified } from "../middlewares/AuthVerification.js";

const UserRoutes = new Router();

UserRoutes.post("/create", UserCreate);
UserRoutes.post("/login", UserLogIn);
UserRoutes.get("/email-verify/:email", UserEmailVerify);
UserRoutes.get("/otp-verify/:email/:otp", UserOTPVerify);
UserRoutes.post("/pass-reset", UserPassReset);
UserRoutes.get("/details", AuthVerified, UserDetails);
UserRoutes.post("/update", AuthVerified, UserUpdate);

export default UserRoutes;
