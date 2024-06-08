import { Router } from "express";
import { AuthVerified } from "../middlewares/AuthVerification.js";
import {
  ProductCreate,
  ProductDelete,
  ProductList,
  ProductUpdate,
} from "../controllers/product/ProductController.js";

const ProductRoutes = new Router();

ProductRoutes.post("/create", AuthVerified, ProductCreate);
ProductRoutes.put("/update/:id", AuthVerified, ProductUpdate);
ProductRoutes.get(
  "/tableList/:pageNo/:perPage/:searchKeyword",
  AuthVerified,
  ProductList
);
ProductRoutes.delete("/delete/:id", AuthVerified, ProductDelete);

export default ProductRoutes;
