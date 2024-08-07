import { Router } from "express";
import { AuthVerified } from "../middlewares/AuthVerification.js";

import {
  ReturnCreate,
  ReturnDelete,
  ReturnDetail,
  ReturnList,
  ReturnReport,
  ReturnSummary,
  ReturnUpdate,
} from "../controllers/return/ReturnController.js";

const ReturnRoutes = new Router();

ReturnRoutes.post("/create", AuthVerified, ReturnCreate);
ReturnRoutes.post("/update/:id", AuthVerified, ReturnUpdate);
ReturnRoutes.get(
  "/tableList/:pageNo/:perPage/:searchKeyword",
  AuthVerified,
  ReturnList
);
ReturnRoutes.delete("/delete/:id", AuthVerified, ReturnDelete);
ReturnRoutes.post("/report", AuthVerified, ReturnReport);
ReturnRoutes.get("/summary", AuthVerified, ReturnSummary);
ReturnRoutes.get("/detail/:id", AuthVerified, ReturnDetail);

export default ReturnRoutes;
