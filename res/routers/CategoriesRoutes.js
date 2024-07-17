import { Router } from "express";
import { AuthVerified } from "../middlewares/AuthVerification.js";
import {
  CategoryCreate,
  CategoryDelete,
  CategoryDetail,
  CategoryDropDown,
  CategoryList,
  CategoryStatus,
  CategoryUpdate,
} from "../controllers/CategoriesControllers.js";

const CategoriesRoutes = Router();

CategoriesRoutes.post("/create", AuthVerified, CategoryCreate);
CategoriesRoutes.get("/detail/:id", AuthVerified, CategoryDetail);
CategoriesRoutes.post("/update/:id", AuthVerified, CategoryUpdate);
CategoriesRoutes.get("/dropdownlist", AuthVerified, CategoryDropDown);
CategoriesRoutes.get(
  "/tableList/:pageNo/:perPage/:searchKeyword",
  AuthVerified,
  CategoryList
);
CategoriesRoutes.delete("/delete/:id", AuthVerified, CategoryDelete);
CategoriesRoutes.get("/statusUpdate/:id", AuthVerified, CategoryStatus);

export default CategoriesRoutes;
