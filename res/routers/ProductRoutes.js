import { Router } from "express";
import { AuthVerified } from "../middlewares/AuthVerification.js";
import {
  ProductCreate,
  ProductDelete,
  ProductDetail,
  ProductDropDown,
  ProductList,
  ProductStatus,
  ProductUpdate,
} from "../controllers/product/ProductController.js";

const ProductRoutes = new Router();

ProductRoutes.post("/create", AuthVerified, ProductCreate);
ProductRoutes.get("/detail/:id", AuthVerified, ProductDetail);
ProductRoutes.post("/update/:id", AuthVerified, ProductUpdate);
ProductRoutes.get("/dropdownlist", AuthVerified, ProductDropDown);
ProductRoutes.get(
  "/tableList/:pageNo/:perPage/:searchKeyword",
  AuthVerified,
  ProductList
);
ProductRoutes.delete("/delete/:id", AuthVerified, ProductDelete);
ProductRoutes.put("/statusUpdate/:id", AuthVerified, ProductStatus);

export default ProductRoutes;
