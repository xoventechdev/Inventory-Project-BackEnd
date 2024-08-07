import { ReturnItemModel } from "../../models/return/ReturnItemModel.js";
import { ReturnModel } from "../../models/return/ReturnModel.js";
import { CreateParentChildServices } from "../../services/common/CreateParentChildServices.js";
import { DeleteParentChildService } from "../../services/common/DeleteParentChildService.js";
import { DetailParentChildServices } from "../../services/common/DetailParentChildServices.js";
import { ListWithOneJoinService } from "../../services/common/ListWithOneJoinService.js";
import { ReportService } from "../../services/common/ReportService.js";
import { UpdateParentChildServices } from "../../services/common/UpdateParentChildServices.js";
import { ReturnSummaryService } from "../../services/summary/ReturnSummaryService.js";

export const ReturnCreate = async (req, res) => {
  let data = await CreateParentChildServices(
    req,
    ReturnModel,
    ReturnItemModel,
    "returnId"
  );
  res.status(200).json(data);
};

export const ReturnUpdate = async (req, res) => {
  let data = await UpdateParentChildServices(
    req,
    ReturnModel,
    ReturnItemModel,
    "returnId"
  );
  res.status(200).json(data);
};

export const ReturnList = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { supplierId: searchRgx },
    { grandCost: searchRgx },
    { note: searchRgx },
    { "customer.name": searchRgx },
    { "customer.mobile": searchRgx },
    { "customer.email": searchRgx },
  ];
  let joinStage = {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customer",
    },
  };
  let data = await ListWithOneJoinService(
    req,
    ReturnModel,
    searchArray,
    joinStage
  );
  res.status(200).json(data);
};

export const ReturnDelete = async (req, res) => {
  let data = await DeleteParentChildService(
    req,
    ReturnModel,
    ReturnItemModel,
    "returnId"
  );
  res.status(200).json(data);
};

export const ReturnReport = async (req, res) => {
  let data = await ReportService(req, ReturnItemModel);
  res.status(200).json(data);
};

export const ReturnSummary = async (req, res) => {
  let data = await ReturnSummaryService(req);
  res.status(200).json(data);
};

export const ReturnDetail = async (req, res) => {
  let joinStage1 = {
    $lookup: {
      from: "return_item",
      localField: "_id",
      foreignField: "returnId",
      as: "items",
    },
  };
  let joinStage2 = {
    $lookup: {
      from: "products",
      localField: "items[0].productId",
      foreignField: "_id",
      as: "product",
    },
  };
  let data = await DetailParentChildServices(
    req,
    ReturnModel,
    joinStage1,
    joinStage2
  );
  res.status(200).json(data);
};
