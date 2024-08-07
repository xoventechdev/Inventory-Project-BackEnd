import { SalesItemModel } from "../../models/sales/SalesItemModel.js";
import { SalesModel } from "../../models/sales/SalesModel.js";
import { CreateParentChildServices } from "../../services/common/CreateParentChildServices.js";
import { DeleteParentChildService } from "../../services/common/DeleteParentChildService.js";
import { DetailParentChildServices } from "../../services/common/DetailParentChildServices.js";
import { DetailService } from "../../services/common/DetailService.js";
import { ListWithOneJoinService } from "../../services/common/ListWithOneJoinService.js";
import { ReportService } from "../../services/common/ReportService.js";
import { SummaryService } from "../../services/common/SummaryService.js";
import { UpdateParentChildServices } from "../../services/common/UpdateParentChildServices.js";
import { SalesSummaryService } from "../../services/summary/SalesSummaryService.js";

export const SalesCreate = async (req, res) => {
  let data = await CreateParentChildServices(
    req,
    SalesModel,
    SalesItemModel,
    "salesId"
  );
  res.status(200).json(data);
};

export const SalesUpdate = async (req, res) => {
  let data = await UpdateParentChildServices(
    req,
    SalesModel,
    SalesItemModel,
    "salesId"
  );
  res.status(200).json(data);
};

export const SalesList = async (req, res) => {
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
    SalesModel,
    searchArray,
    joinStage
  );
  res.status(200).json(data);
};

export const SalesDelete = async (req, res) => {
  let data = await DeleteParentChildService(
    req,
    SalesModel,
    SalesItemModel,
    "salesId"
  );
  res.status(200).json(data);
};

export const SalesReport = async (req, res) => {
  let data = await ReportService(req, SalesItemModel);
  res.status(200).json(data);
};

export const SalesSummary = async (req, res) => {
  let data = await SalesSummaryService(req);
  res.status(200).json(data);
};

export const SalesDetail = async (req, res) => {
  let joinStage1 = {
    $lookup: {
      from: "sales_items",
      localField: "_id",
      foreignField: "salesId",
      as: "items",
    },
  };
  let joinStage2 = {
    $lookup: {
      from: "products",
      localField: "items.productId",
      foreignField: "_id",
      as: "items.product",
    },
  };
  let data = await DetailParentChildServices(
    req,
    SalesModel,
    joinStage1,
    joinStage2
  );
  res.status(200).json(data);
};
