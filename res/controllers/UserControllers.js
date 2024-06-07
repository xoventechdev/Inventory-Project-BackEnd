import { OTPModel } from "../models/User/OTPModel.js";
import { UserModel } from "../models/User/UserModel.js";
import { UserCreateService } from "../services/user/UserCreateService.js";
import { UserDetailsService } from "../services/user/UserDetailsService.js";
import { UserEmailVerifyService } from "../services/user/UserEmailVerifyService.js";
import { UserLogInService } from "../services/user/UserLogInService.js";
import { UserOTPVerifyService } from "../services/user/UserOTPVerifyService.js";
import { UserPassResetService } from "../services/user/UserPassResetService.js";
import { UserUpdateService } from "../services/user/UserUpdateService.js";

export const UserCreate = async (req, res) => {
  let data = await UserCreateService(req, UserModel);
  res.status(200).json(data);
};

export const UserDetails = async (req, res) => {
  let data = await UserDetailsService(req, UserModel);
  res.status(200).json(data);
};

export const UserEmailVerify = async (req, res) => {
  let data = await UserEmailVerifyService(req, UserModel);
  res.status(200).json(data);
};

export const UserLogIn = async (req, res) => {
  let data = await UserLogInService(req, UserModel);
  if (data.status === "success") {
    res.cookie("token", data.response, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    });
  }
  res.status(200).json(data);
};

export const UserOTPVerify = async (req, res) => {
  let data = await UserOTPVerifyService(req, OTPModel);
  res.status(200).json(data);
};

export const UserPassReset = async (req, res) => {
  let data = await UserPassResetService(req, UserModel);
  res.status(200).json(data);
};

export const UserUpdate = async (req, res) => {
  let data = await UserUpdateService(req, UserModel);
  res.status(200).json(data);
};
