import { ExpenseTypeModel } from "../../models/expense/ExpenseTypeModel.js";
import { CreateService } from "../../services/common/CreateService.js";
import { DeleteService } from "../../services/common/DeleteService.js";
import { DropDownService } from "../../services/common/DropDownService.js";
import { ListService } from "../../services/common/ListService.js";
import { StatusService } from "../../services/common/StatusService.js";
import { UpdateService } from "../../services/common/UpdateService.js";

export const ExpenseTypeCreate = async (req, res) => {
  let data = await CreateService(req, ExpenseTypeModel);
  res.status(200).json(data);
};

export const ExpenseTypeUpdate = async (req, res) => {
  let data = await UpdateService(req, ExpenseTypeModel);
  res.status(200).json(data);
};

export const ExpenseTypeList = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [{ name: searchRgx }];
  let data = await ListService(req, ExpenseTypeModel, searchArray);
  res.status(200).json(data);
};

export const ExpenseTypeDropDown = async (req, res) => {
  let data = await DropDownService(req, ExpenseTypeModel, { _id: 1, name: 1 });
  res.status(200).json(data);
};

export const ExpenseTypeDelete = async (req, res) => {
  let data = await DeleteService(req, ExpenseTypeModel);
  res.status(200).json(data);
};

export const ExpenseTypeStatus = async (req, res) => {
  let data = await StatusService(req, ExpenseTypeModel);
  res.status(200).json(data);
};
