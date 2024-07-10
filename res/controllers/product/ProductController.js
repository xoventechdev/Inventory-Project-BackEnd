import { ProductModel } from "../../models/product/ProductModel.js";
import { PurchaseItemModel } from "../../models/purchase/PurchaseItemModel.js";
import { ReturnItemModel } from "../../models/return/ReturnItemModel.js";
import { SalesItemModel } from "../../models/sales/SalesItemModel.js";
import { CreateService } from "../../services/common/CreateService.js";
import { DeleteService } from "../../services/common/DeleteService.js";
import { DropDownService } from "../../services/common/DropDownService.js";
import { ListWithTwoJoinService } from "../../services/common/ListWithTwoJoinService.js";
import { StatusService } from "../../services/common/StatusService.js";
import { UpdateService } from "../../services/common/UpdateService.js";
import { CheckAssociateService } from "../../services/common/CheckAssociateService.js";
import mongoose from "mongoose";
import { DetailService } from "../../services/common/DetailService.js";

export const ProductCreate = async (req, res) => {
  let data = await CreateService(req, ProductModel);
  res.status(200).json(data);
};

export const ProductUpdate = async (req, res) => {
  let data = await UpdateService(req, ProductModel);
  res.status(200).json(data);
};

export const ProductDropDown = async (req, res) => {
  let data = await DropDownService(req, ProductModel, { _id: 1, name: 1 });
  res.status(200).json(data);
};

export const ProductList = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { name: searchRgx },
    { unit: searchRgx },
    { details: searchRgx },
    { "category.name": searchRgx },
    { "brand.name": searchRgx },
  ];
  let joinStageOne = {
    $lookup: {
      from: "categories",
      localField: "categoryId",
      foreignField: "_id",
      as: "category",
    },
  };
  let joinStageTwo = {
    $lookup: {
      from: "brands",
      localField: "brandId",
      foreignField: "_id",
      as: "brand",
    },
  };
  let data = await ListWithTwoJoinService(
    req,
    ProductModel,
    searchArray,
    joinStageOne,
    joinStageTwo
  );
  res.status(200).json(data);
};

export const ProductDelete = async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  let checkInReturn = await CheckAssociateService(
    { productId: new ObjectId(req.params.id) },
    ReturnItemModel
  );
  let checkInSales = await CheckAssociateService(
    { productId: new ObjectId(req.params.id) },
    SalesItemModel
  );
  let checkInPurchase = await CheckAssociateService(
    { productId: new ObjectId(req.params.id) },
    PurchaseItemModel
  );
  if (checkInReturn) {
    res.status(400).json({
      status: "warning",
      response:
        "Can not delete this item because it is associated with Return items",
    });
  } else if (checkInSales) {
    res.status(400).json({
      status: "warning",
      response:
        "Can not delete this item because it is associated with Sales items",
    });
  } else if (checkInPurchase) {
    res.status(400).json({
      status: "warning",
      response:
        "Can not delete this item because it is associated with Purchase items",
    });
  } else {
    let data = await DeleteService(req, ProductModel);
    res.status(200).json(data);
  }
};

export const ProductStatus = async (req, res) => {
  let data = await StatusService(req, ProductModel);
  res.status(200).json(data);
};

export const ProductDetail = async (req, res) => {
  let data = await DetailService(req, ProductModel);
  res.status(200).json(data);
};
