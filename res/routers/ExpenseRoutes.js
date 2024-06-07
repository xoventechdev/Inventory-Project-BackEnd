import { Router } from "express";
import { AuthVerified } from "../middlewares/AuthVerification.js";
import {
  ExpenseCreate,
  ExpenseDelete,
  ExpenseDropDown,
  ExpenseList,
  ExpenseStatus,
  ExpenseUpdate,
} from "../controllers/expense/ExpenseControllers.js";

const ExpenseRoutes = new Router();

ExpenseRoutes.post("/create", AuthVerified, ExpenseCreate);
ExpenseRoutes.put("/update/:id", AuthVerified, ExpenseUpdate);
ExpenseRoutes.get("/dropdownlist", AuthVerified, ExpenseDropDown);
ExpenseRoutes.get(
  "/tableList/:pageNo/:perPage/:searchKeyword",
  AuthVerified,
  ExpenseList
);
ExpenseRoutes.delete("/delete/:id", AuthVerified, ExpenseDelete);
ExpenseRoutes.put("/statusUpdate/:id", AuthVerified, ExpenseStatus);

export default ExpenseRoutes;
