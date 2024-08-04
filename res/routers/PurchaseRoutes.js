import { Router } from "express";
import { AuthVerified } from "../middlewares/AuthVerification.js";
import {
  PurchaseCreate,
  PurchaseDelete,
  PurchaseDetail,
  PurchaseList,
  PurchaseReport,
  PurchaseSummary,
} from "../controllers/purchase/PurchaseController.js";

const PurchaseRoutes = new Router();

PurchaseRoutes.post("/create", AuthVerified, PurchaseCreate);
PurchaseRoutes.get(
  "/tableList/:pageNo/:perPage/:searchKeyword",
  AuthVerified,
  PurchaseList
);
PurchaseRoutes.delete("/delete/:id", AuthVerified, PurchaseDelete);
PurchaseRoutes.post("/report", AuthVerified, PurchaseReport);
PurchaseRoutes.get("/summary", AuthVerified, PurchaseSummary);
PurchaseRoutes.get("/detail/:id", AuthVerified, PurchaseDetail);

export default PurchaseRoutes;
