import express from "express";
import productController from "../../controllers/product.controller.js";
import { asyncHandler } from "../../helper/asyncHandler.js";
import { authentication } from "../../auth/auth_utils.js";
const router = express.Router();

// Authentication required
router.use(authentication);
router.post("", asyncHandler(productController.createProduct));

export default router;
