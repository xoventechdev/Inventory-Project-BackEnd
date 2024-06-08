import { ExpenseModel } from "../../models/expense/ExpenseModel.js";
import { CreateService } from "../../services/common/CreateService.js";
import { DeleteService } from "../../services/common/DeleteService.js";
import { ListWithOneJoinService } from "../../services/common/ListWithOneJoinService.js";
import { UpdateService } from "../../services/common/UpdateService.js";

export const ExpenseCreate = async (req, res) => {
  let data = await CreateService(req, ExpenseModel);
  res.status(200).json(data);
};

export const ExpenseUpdate = async (req, res) => {
  let data = await UpdateService(req, ExpenseModel);
  res.status(200).json(data);
};

export const ExpenseList = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { name: searchRgx },
    { amount: searchRgx },
    { note: searchRgx },
    { "type.name": searchRgx },
  ];
  let joinStage = {
    $lookup: {
      from: "expense_types",
      localField: "typeID",
      foreignField: "_id",
      as: "type",
    },
  };
  let data = await ListWithOneJoinService(
    req,
    ExpenseModel,
    searchArray,
    joinStage
  );
  res.status(200).json(data);
};

export const ExpenseDelete = async (req, res) => {
  let data = await DeleteService(req, ExpenseModel);
  res.status(200).json(data);
};
