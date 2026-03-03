import express from "express";
import { apiKey } from "../auth/check_auth.js";
import accessRoutes from "./access/index.js";
import productRoutes from "./product/index.js";

const router = express.Router();
router.use("/api/v1", accessRoutes);
router.use("/api/v1/product", productRoutes);

export default router;
