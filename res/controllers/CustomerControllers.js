import { CustomerModel } from "../models/CustomerModel.js";
import { CreateService } from "../services/common/CreateService.js";
import { DeleteService } from "../services/common/DeleteService.js";
import { DropDownService } from "../services/common/DropDownService.js";
import { ListService } from "../services/common/ListService.js";
import { StatusService } from "../services/common/StatusService.js";
import { UpdateService } from "../services/common/UpdateService.js";

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
  let data = await DeleteService(req, CustomerModel);
  res.status(200).json(data);
};

export const CustomerStatus = async (req, res) => {
  let data = await StatusService(req, CustomerModel);
  res.status(200).json(data);
};
