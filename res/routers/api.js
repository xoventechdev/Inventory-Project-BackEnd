import { Router } from "express";
import { UserCreate, UserLogIn } from "../controllers/UserControllers.js";
const router = new Router();

//User routes
router.post("/user/create", UserCreate);
router.post("/user/login", UserLogIn);

export default router;
