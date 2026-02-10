import express from "express";
import accessController from "../../controllers/access.controller.js";
import { asyncHandler } from "../../helper/asyncHandler.js";
import { authentication } from "../../auth/auth_utils.js";
const router = express.Router();

// Sign up
router.post("/shop/signup", asyncHandler(accessController.signUp));

// Login
router.post("/shop/login", asyncHandler(accessController.login));

// Authentication required
router.use(authentication);

// Logout
router.post("/shop/logout", asyncHandler(accessController.logout));

// // Refresh token
// router.post('/shop/refresh-token', asyncHandler(accessController.handleRefreshToken));

export default router;
