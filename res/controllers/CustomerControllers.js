import { CustomerModel } from "../models/CustomerModel.js";
import { SalesModel } from "../models/sales/SalesModel.js";
import { CreateService } from "../services/common/CreateService.js";
import { DeleteService } from "../services/common/DeleteService.js";
import { DropDownService } from "../services/common/DropDownService.js";
import { ListService } from "../services/common/ListService.js";
import { StatusService } from "../services/common/StatusService.js";
import { UpdateService } from "../services/common/UpdateService.js";
import { CheckAssociateService } from "../services/common/CheckAssociateService.js";
import mongoose from "mongoose";
import { DetailService } from "../services/common/DetailService.js";

export const CustomerCreate = async (req, res) => {
  let data = await CreateService(req, CustomerModel);
  res.status(200).json(data);
};

export const CustomerUpdate = async (req, res) => {
  let data = await UpdateService(req, CustomerModel);
  res.status(200).json(data);
};

export const CustomerList = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { name: searchRgx },
    { mobile: searchRgx },
    { email: searchRgx },
    { address: searchRgx },
  ];
  let data = await ListService(req, CustomerModel, searchArray);
  res.status(200).json(data);
};

export const CustomerDropDown = async (req, res) => {
  let data = await DropDownService(req, CustomerModel, { _id: 1, name: 1 });
  res.status(200).json(data);
};

export const CustomerDelete = async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  let checkItem = await CheckAssociateService(
    { customerId: new ObjectId(req.params.id) },
    SalesModel
  );
  if (checkItem) {
    res.status(400).json({
      status: "warning",
      response:
        "Can not delete this item because it is associated with Sale items",
    });
  } else {
    let data = await DeleteService(req, CustomerModel);
    res.status(200).json(data);
  }
};

export const CustomerStatus = async (req, res) => {
  let data = await StatusService(req, CustomerModel);
  res.status(200).json(data);
};

export const CustomerDetail = async (req, res) => {
  let data = await DetailService(req, CustomerModel);
  res.status(200).json(data);
};
