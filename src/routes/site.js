const express = require('express');
const router = express.Router();

const site_controller = require('../app/controllers/site_controller');

router.get('/login', site_controller.login);

// router.get('/search', site_controller.search);

// router.get('/:slug', site_controller.show);

router.get('/', site_controller.index);

module.exports = router;