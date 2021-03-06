const express = require('express');
const router = express.Router();

const site_controller = require('../app/controllers/site_controller');

// router.get('/login', site_controller.login);
router.get('/change-password', site_controller.changepass);
router.put('/update-password', site_controller.updatepass);
router.post('/login', site_controller.check);
router.put('/change-password', site_controller.updatepass)
router.get('/log-out',site_controller.logout);
router.get('/', site_controller.index);

module.exports = router;