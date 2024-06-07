import { BrandModel } from "../models/BrandModel.js";
import { CreateService } from "../services/common/CreateService.js";
import { DeleteService } from "../services/common/DeleteService.js";
import { DropDownService } from "../services/common/DropDownService.js";
import { ListService } from "../services/common/ListService.js";
import { StatusService } from "../services/common/StatusService.js";
import { UpdateService } from "../services/common/UpdateService.js";

export const BrandCreate = async (req, res) => {
  let data = await CreateService(req, BrandModel);
  res.status(200).json(data);
};

export const BrandUpdate = async (req, res) => {
  let data = await UpdateService(req, BrandModel);
  res.status(200).json(data);
};

export const BrandList = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [{ name: searchRgx }];
  let data = await ListService(req, BrandModel, searchArray);
  res.status(200).json(data);
};

export const BrandDropDown = async (req, res) => {
  let data = await DropDownService(req, BrandModel, { _id: 1, name: 1 });
  res.status(200).json(data);
};

export const BrandDelete = async (req, res) => {
  let data = await DeleteService(req, BrandModel);
  res.status(200).json(data);
};

export const BrandStatus = async (req, res) => {
  let data = await StatusService(req, BrandModel);
  res.status(200).json(data);
};
