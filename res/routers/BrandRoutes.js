import { Router } from "express";
import { AuthVerified } from "../middlewares/AuthVerification.js";
import {
  BrandCreate,
  BrandDelete,
  BrandDetail,
  BrandDropDown,
  BrandList,
  BrandStatus,
  BrandUpdate,
} from "../controllers/BrandControllers.js";

const BrandRoutes = new Router();

BrandRoutes.post("/create", AuthVerified, BrandCreate);
BrandRoutes.get("/detail/:id", AuthVerified, BrandDetail);
BrandRoutes.put("/update/:id", AuthVerified, BrandUpdate);
BrandRoutes.get("/dropdownlist", AuthVerified, BrandDropDown);
BrandRoutes.get(
  "/tableList/:pageNo/:perPage/:searchKeyword",
  AuthVerified,
  BrandList
);
BrandRoutes.delete("/delete/:id", AuthVerified, BrandDelete);
BrandRoutes.put("/statusUpdate/:id", AuthVerified, BrandStatus);

export default BrandRoutes;
