import { UserModel } from "../models/UserModel.js";
import { UserCreateService } from "../services/user/UserCreateService.js";

export const UserCreate = async (req, res) => {
  const data = await UserCreateService(req, UserModel);
  res.status(200).json(data);
};

export const UserLogIn = async (req, res) => {};
