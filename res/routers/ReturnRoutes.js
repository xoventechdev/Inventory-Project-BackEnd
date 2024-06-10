import { Router } from "express";
import { AuthVerified } from "../middlewares/AuthVerification.js";

import {
  ReturnCreate,
  ReturnDelete,
  ReturnList,
  ReturnReport,
  ReturnSummary,
} from "../controllers/return/ReturnController.js";

const ReturnRoutes = new Router();

ReturnRoutes.post("/create", AuthVerified, ReturnCreate);
ReturnRoutes.get(
  "/tableList/:pageNo/:perPage/:searchKeyword",
  AuthVerified,
  ReturnList
);
ReturnRoutes.delete("/delete/:id", AuthVerified, ReturnDelete);
ReturnRoutes.get("/report", AuthVerified, ReturnReport);
ReturnRoutes.get("/summary", AuthVerified, ReturnSummary);

export default ReturnRoutes;
