import { ExpenseModel } from "../../models/expense/ExpenseModel.js";
import { CreateService } from "../../services/common/CreateService.js";
import { DeleteService } from "../../services/common/DeleteService.js";
import { DetailService } from "../../services/common/DetailService.js";
import { ListWithOneJoinService } from "../../services/common/ListWithOneJoinService.js";
import { ReportService } from "../../services/common/ReportService.js";
import { UpdateService } from "../../services/common/UpdateService.js";
import { ExpenseReportService } from "../../services/report/ExpenseReportService.js";
import { ExpenseSummaryService } from "../../services/summary/ExpenseSummaryService.js";

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

export const ExpenseReport = async (req, res) => {
  let data = await ExpenseReportService(req);
  // let data = await ReportService(req, ExpenseModel);
  res.status(200).json(data);
};

export const ExpenseSummary = async (req, res) => {
  let data = await ExpenseSummaryService(req);
  res.status(200).json(data);
};

export const ExpenseDetail = async (req, res) => {
  let data = await DetailService(req, ExpenseModel);
  res.status(200).json(data);
};
