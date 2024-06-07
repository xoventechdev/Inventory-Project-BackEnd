import { Router } from "express";
import { AuthVerified } from "../middlewares/AuthVerification.js";
import {
  SupplierCreate,
  SupplierDelete,
  SupplierDropDown,
  SupplierList,
  SupplierStatus,
  SupplierUpdate,
} from "../controllers/SupplierControllers.js";

const SupplierRoutes = Router();

SupplierRoutes.post("/create", AuthVerified, SupplierCreate);
SupplierRoutes.put("/update/:id", AuthVerified, SupplierUpdate);
SupplierRoutes.get("/dropdownlist", AuthVerified, SupplierDropDown);
SupplierRoutes.get(
  "/tableList/:pageNo/:perPage/:searchKeyword",
  AuthVerified,
  SupplierList
);
SupplierRoutes.delete("/delete/:id", AuthVerified, SupplierDelete);
SupplierRoutes.put("/statusUpdate/:id", AuthVerified, SupplierStatus);

export default SupplierRoutes;
