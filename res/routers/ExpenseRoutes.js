import { Router } from "express";
import { AuthVerified } from "../middlewares/AuthVerification.js";
import {
  ExpenseCreate,
  ExpenseDelete,
  ExpenseList,
  ExpenseUpdate,
} from "../controllers/expense/ExpenseControllers.js";

const ExpenseRoutes = new Router();

ExpenseRoutes.post("/create", AuthVerified, ExpenseCreate);
ExpenseRoutes.put("/update/:id", AuthVerified, ExpenseUpdate);
ExpenseRoutes.get(
  "/tableList/:pageNo/:perPage/:searchKeyword",
  AuthVerified,
  ExpenseList
);
ExpenseRoutes.delete("/delete/:id", AuthVerified, ExpenseDelete);

export default ExpenseRoutes;
