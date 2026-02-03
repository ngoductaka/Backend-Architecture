const router = require('express').Router();
const { apiKey } = require('../auth/check_auth.js');

router.use(apiKey);
router.use('/api/v1', require('./access'));

module.exports = router;