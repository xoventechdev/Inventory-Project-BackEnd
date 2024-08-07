import { Router } from "express";
import { AuthVerified } from "../middlewares/AuthVerification.js";
import {
  SalesCreate,
  SalesDelete,
  SalesDetail,
  SalesList,
  SalesReport,
  SalesSummary,
  SalesUpdate,
} from "../controllers/sales/SalesController.js";

const SalesRoutes = new Router();

SalesRoutes.post("/create", AuthVerified, SalesCreate);
SalesRoutes.post("/update/:id", AuthVerified, SalesUpdate);
SalesRoutes.get(
  "/tableList/:pageNo/:perPage/:searchKeyword",
  AuthVerified,
  SalesList
);
SalesRoutes.delete("/delete/:id", AuthVerified, SalesDelete);
SalesRoutes.post("/report", AuthVerified, SalesReport);
SalesRoutes.get("/summary", AuthVerified, SalesSummary);
SalesRoutes.get("/detail/:id", AuthVerified, SalesDetail);

export default SalesRoutes;
