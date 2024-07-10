import { CategoriesModel } from "../models/CategoriesModel.js";
import { ProductModel } from "../models/product/ProductModel.js";
import { CreateService } from "../services/common/CreateService.js";
import { DeleteService } from "../services/common/DeleteService.js";
import { DropDownService } from "../services/common/DropDownService.js";
import { ListService } from "../services/common/ListService.js";
import { StatusService } from "../services/common/StatusService.js";
import { UpdateService } from "../services/common/UpdateService.js";
import { CheckAssociateService } from "../services/common/CheckAssociateService.js";
import mongoose from "mongoose";
import { DetailService } from "../services/common/DetailService.js";

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
  const ObjectId = mongoose.Types.ObjectId;
  let checkItem = await CheckAssociateService(
    { categoryId: new ObjectId(req.params.id) },
    ProductModel
  );
  if (checkItem) {
    res.status(400).json({
      status: "warning",
      response:
        "Can not delete this item because it is associated with Product items",
    });
  } else {
    let data = await DeleteService(req, CategoriesModel);
    res.status(200).json(data);
  }
};

export const CategoryStatus = async (req, res) => {
  let data = await StatusService(req, CategoriesModel);
  res.status(200).json(data);
};

export const CategoryDetail = async (req, res) => {
  let data = await DetailService(req, CategoriesModel);
  res.status(200).json(data);
};
