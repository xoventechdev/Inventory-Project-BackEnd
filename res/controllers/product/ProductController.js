import { ProductModel } from "../../models/product/ProductModel.js";
import { CreateService } from "../../services/common/CreateService.js";
import { DeleteService } from "../../services/common/DeleteService.js";
import { DropDownService } from "../../services/common/DropDownService.js";
import { ListService } from "../../services/common/ListService.js";
import { ListWithTwoJoinService } from "../../services/common/ListWithTwoJoinService.js";
import { StatusService } from "../../services/common/StatusService.js";
import { UpdateService } from "../../services/common/UpdateService.js";

export const ProductCreate = async (req, res) => {
  let data = await CreateService(req, ProductModel);
  res.status(200).json(data);
};

export const ProductUpdate = async (req, res) => {
  let data = await UpdateService(req, ProductModel);
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
  let data = await DeleteService(req, ProductModel);
  res.status(200).json(data);
};
