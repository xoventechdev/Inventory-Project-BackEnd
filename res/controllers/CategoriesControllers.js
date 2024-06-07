import { CategoriesModel } from "../models/CategoriesModel.js";
import { CreateService } from "../services/common/CreateService.js";
import { DeleteService } from "../services/common/DeleteService.js";
import { DropDownService } from "../services/common/DropDownService.js";
import { ListService } from "../services/common/ListService.js";
import { StatusService } from "../services/common/StatusService.js";
import { UpdateService } from "../services/common/UpdateService.js";

export const CategoryCreate = async (req, res) => {
  let data = await CreateService(req, CategoriesModel);
  res.status(200).json(data);
};

export const CategoryUpdate = async (req, res) => {
  let data = await UpdateService(req, CategoriesModel);
  res.status(200).json(data);
};

export const CategoryList = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [{ name: searchRgx }];
  let data = await ListService(req, CategoriesModel, searchArray);
  res.status(200).json(data);
};

export const CategoryDropDown = async (req, res) => {
  let data = await DropDownService(req, CategoriesModel, { _id: 1, name: 1 });
  res.status(200).json(data);
};

export const CategoryDelete = async (req, res) => {
  let data = await DeleteService(req, CategoriesModel);
  res.status(200).json(data);
};

export const CategoryStatus = async (req, res) => {
  let data = await StatusService(req, CategoriesModel);
  res.status(200).json(data);
};
