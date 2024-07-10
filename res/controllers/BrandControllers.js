import { BrandModel } from "../models/BrandModel.js";
import { ProductModel } from "../models/product/ProductModel.js";
import { CheckAssociateService } from "../services/common/CheckAssociateService.js";
import { CreateService } from "../services/common/CreateService.js";
import { DeleteService } from "../services/common/DeleteService.js";
import { DetailService } from "../services/common/DetailService.js";
import { DropDownService } from "../services/common/DropDownService.js";
import { ListService } from "../services/common/ListService.js";
import { StatusService } from "../services/common/StatusService.js";
import { UpdateService } from "../services/common/UpdateService.js";
import mongoose from "mongoose";

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
  const ObjectId = mongoose.Types.ObjectId;
  let checkItem = await CheckAssociateService(
    { brandId: new ObjectId(req.params.id) },
    ProductModel
  );
  if (checkItem) {
    res.status(400).json({
      status: "warning",
      response:
        "Can not delete this item because it is associated with Product items",
    });
  } else {
    let data = await DeleteService(req, BrandModel);
    res.status(200).json(data);
  }
};

export const BrandStatus = async (req, res) => {
  let data = await StatusService(req, BrandModel);
  res.status(200).json(data);
};

export const BrandDetail = async (req, res) => {
  let data = await DetailService(req, BrandModel);
  res.status(200).json(data);
};
