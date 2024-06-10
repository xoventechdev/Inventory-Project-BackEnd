import { Router } from "express";
import { AuthVerified } from "../middlewares/AuthVerification.js";
import {
  SalesCreate,
  SalesDelete,
  SalesList,
  SalesReport,
  SalesSummary,
} from "../controllers/sales/SalesController.js";

const SalesRoutes = new Router();

SalesRoutes.post("/create", AuthVerified, SalesCreate);
SalesRoutes.get(
  "/tableList/:pageNo/:perPage/:searchKeyword",
  AuthVerified,
  SalesList
);
SalesRoutes.delete("/delete/:id", AuthVerified, SalesDelete);
SalesRoutes.get("/report", AuthVerified, SalesReport);
SalesRoutes.get("/summary", AuthVerified, SalesSummary);

export default SalesRoutes;
