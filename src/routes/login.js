const express = require('express');
const router = express.Router();

const news_controller = require('../app/controllers/login_controller');

router.get('/:slug', news_controller.show);

router.get('/', news_controller.index);

module.exports = router;