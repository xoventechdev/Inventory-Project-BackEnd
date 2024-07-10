import { SupplierModel } from "../models/SupplierModel.js";
import { PurchaseModel } from "../models/purchase/PurchaseModel.js";
import { CreateService } from "../services/common/CreateService.js";
import { DeleteService } from "../services/common/DeleteService.js";
import { DropDownService } from "../services/common/DropDownService.js";
import { ListService } from "../services/common/ListService.js";
import { StatusService } from "../services/common/StatusService.js";
import { UpdateService } from "../services/common/UpdateService.js";
import { CheckAssociateService } from "../services/common/CheckAssociateService.js";
import mongoose from "mongoose";
import { DetailService } from "../services/common/DetailService.js";

export const SupplierCreate = async (req, res) => {
  let data = await CreateService(req, SupplierModel);
  res.status(200).json(data);
};

export const SupplierUpdate = async (req, res) => {
  let data = await UpdateService(req, SupplierModel);
  res.status(200).json(data);
};

export const SupplierList = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { name: searchRgx },
    { mobile: searchRgx },
    { email: searchRgx },
    { address: searchRgx },
  ];
  let data = await ListService(req, SupplierModel, searchArray);
  res.status(200).json(data);
};

export const SupplierDropDown = async (req, res) => {
  let data = await DropDownService(req, SupplierModel, { _id: 1, name: 1 });
  res.status(200).json(data);
};

export const SupplierDelete = async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  let checkItem = await CheckAssociateService(
    { supplierId: new ObjectId(req.params.id) },
    PurchaseModel
  );
  if (checkItem) {
    res.status(400).json({
      status: "warning",
      response:
        "Can not delete this item because it is associated with Purchase items",
    });
  } else {
    let data = await DeleteService(req, SupplierModel);
    res.status(200).json(data);
  }
};

export const SupplierStatus = async (req, res) => {
  let data = await StatusService(req, SupplierModel);
  res.status(200).json(data);
};

export const SupplierDetail = async (req, res) => {
  let data = await DetailService(req, SupplierModel);
  res.status(200).json(data);
};
