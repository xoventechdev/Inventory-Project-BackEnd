import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import expressMongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import UserRoutes from "./res/routers/UserRoutes.js";
import BrandRoutes from "./res/routers/BrandRoutes.js";
import CategoriesRoutes from "./res/routers/CategoriesRoutes.js";
import CustomerRoutes from "./res/routers/CustomerRoutes.js";
import SupplierRoutes from "./res/routers/SupplierRoutes.js";
import ExpenseRoutes from "./res/routers/ExpenseRoutes.js";
import ExpenseTypeRoutes from "./res/routers/ExpenseTypeRoutes.js";
import ProductRoutes from "./res/routers/ProductRoutes.js";
import PurchaseRoutes from "./res/routers/PurchaseRoutes.js";
import SalesRoutes from "./res/routers/SalesRoutes.js";
import ReturnRoutes from "./res/routers/ReturnRoutes.js";

const app = express();

dotenv.config();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
  })
);
app.use(expressMongoSanitize());
app.use(helmet());
app.use(hpp());
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
});
app.use(limiter);

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

//API Routers Connection
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/brand", BrandRoutes);
app.use("/api/v1/category", CategoriesRoutes);
app.use("/api/v1/customer", CustomerRoutes);
app.use("/api/v1/supplier", SupplierRoutes);
app.use("/api/v1/expense-type", ExpenseTypeRoutes);
app.use("/api/v1/expense", ExpenseRoutes);
app.use("/api/v1/product", ProductRoutes);
app.use("/api/v1/purchase", PurchaseRoutes);
app.use("/api/v1/sales", SalesRoutes);
app.use("/api/v1/return", ReturnRoutes);

app.get("/", (req, res) => {
  res.json({
    status: "success",
    response: "The app is loaded successfully",
  });
});

app.use("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Page not found",
  });
});

export default app;
