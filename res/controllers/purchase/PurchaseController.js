import { PurchaseItemModel } from "../../models/purchase/PurchaseItemModel.js";
import { PurchaseModel } from "../../models/purchase/PurchaseModel.js";
import { CreateParentChildServices } from "../../services/common/CreateParentChildServices.js";
import { DeleteParentChildService } from "../../services/common/DeleteParentChildService.js";
import { DetailParentChildServices } from "../../services/common/DetailParentChildServices.js";
import { DetailService } from "../../services/common/DetailService.js";
import { ListWithOneJoinService } from "../../services/common/ListWithOneJoinService.js";
import { ReportService } from "../../services/common/ReportService.js";
import { SummaryService } from "../../services/common/SummaryService.js";
import { UpdateParentChildServices } from "../../services/common/UpdateParentChildServices.js";
import { PurchaseReportService } from "../../services/report/PurchaseReportService.js";
import { PurchaseSummaryService } from "../../services/summary/PurchaseSummaryService.js";

export const PurchaseCreate = async (req, res) => {
  let data = await CreateParentChildServices(
    req,
    PurchaseModel,
    PurchaseItemModel,
    "purchaseId"
  );
  res.status(200).json(data);
};

export const PurchaseUpdate = async (req, res) => {
  let data = await UpdateParentChildServices(
    req,
    PurchaseModel,
    PurchaseItemModel,
    "purchaseId"
  );
  res.status(200).json(data);
};

export const PurchaseList = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { supplierId: searchRgx },
    { grandCost: searchRgx },
    { note: searchRgx },
    { "supplier.name": searchRgx },
    { "supplier.mobile": searchRgx },
    { "supplier.email": searchRgx },
  ];
  let joinStage = {
    $lookup: {
      from: "suppliers",
      localField: "supplierId",
      foreignField: "_id",
      as: "supplier",
    },
  };
  let data = await ListWithOneJoinService(
    req,
    PurchaseModel,
    searchArray,
    joinStage
  );
  res.status(200).json(data);
};

export const PurchaseDelete = async (req, res) => {
  let data = await DeleteParentChildService(
    req,
    PurchaseModel,
    PurchaseItemModel,
    "purchaseId"
  );
  res.status(200).json(data);
};

export const PurchaseReport = async (req, res) => {
  let data = await PurchaseReportService(req);
  res.status(200).json(data);
};

export const PurchaseSummary = async (req, res) => {
  let data = await PurchaseSummaryService(req);
  res.status(200).json(data);
};

export const PurchaseDetail = async (req, res) => {
  let joinStage1 = {
    $lookup: {
      from: "purchases_items",
      localField: "_id",
      foreignField: "purchaseId",
      as: "items",
    },
  };
  let joinStage2 = {
    $group: {
      _id: "$_id",
      supplierId: { $first: "$supplierId" },
      vatTax: { $first: "$vatTax" },
      discount: { $first: "$discount" },
      otherCost: { $first: "$otherCost" },
      shippingCost: { $first: "$shippingCost" },
      grandCost: { $first: "$grandCost" },
      note: { $first: "$note" },
      items: { $push: "$items" },
    },
  };
  let data = await DetailParentChildServices(
    req,
    PurchaseModel,
    joinStage1,
    joinStage2
  );
  res.status(200).json(data);
};
