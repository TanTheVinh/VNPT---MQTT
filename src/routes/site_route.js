const express = require('express');
const router = express.Router();
const site_controller = require('../app/controllers/site_controller');

router.use('/', site_controller.index);

module.exports = router;