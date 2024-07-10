import { Router } from "express";
import { AuthVerified } from "../middlewares/AuthVerification.js";
import {
  ExpenseCreate,
  ExpenseDelete,
  ExpenseDetail,
  ExpenseList,
  ExpenseReport,
  ExpenseSummary,
  ExpenseUpdate,
} from "../controllers/expense/ExpenseControllers.js";

const ExpenseRoutes = new Router();

ExpenseRoutes.post("/create", AuthVerified, ExpenseCreate);
ExpenseRoutes.get("/detail/:id", AuthVerified, ExpenseDetail);
ExpenseRoutes.put("/update/:id", AuthVerified, ExpenseUpdate);
ExpenseRoutes.get(
  "/tableList/:pageNo/:perPage/:searchKeyword",
  AuthVerified,
  ExpenseList
);
ExpenseRoutes.delete("/delete/:id", AuthVerified, ExpenseDelete);
ExpenseRoutes.get("/report", AuthVerified, ExpenseReport);
ExpenseRoutes.get("/summary", AuthVerified, ExpenseSummary);

export default ExpenseRoutes;
