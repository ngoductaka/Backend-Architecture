const express = require('express');
const accessController = require('../../controllers/access.controller');
// const { asyncHandler } = require('../../helpers/asyncHandler');
// const { authentication } = require('../../auth/authUtils');

'use strict'

const router = express.Router();

// Sign up
// router.post('/shop/signup', accessController.signUp);

// Login
router.post('/shop/login', accessController.login);

// // Authentication required
// router.use(authentication);

// // Logout
// router.post('/shop/logout', asyncHandler(accessController.logout));

// // Refresh token
// router.post('/shop/refresh-token', asyncHandler(accessController.handleRefreshToken));

module.exports = router;