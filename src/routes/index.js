import express from "express";
import { apiKey } from "../auth/check_auth.js";
import accessRoutes from "./access/index.js";

const router = express.Router();
router.use("/api/v1", accessRoutes);

export default router;
