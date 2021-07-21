const express = require('express');
const router = express.Router();

const site_controller = require('../app/controllers/site_controller');

router.get('/login', site_controller.login);
router.get('/change-password', site_controller.changepass);
router.post('/', site_controller.check);
router.get('/', site_controller.index);

module.exports = router;