const express = require('express');
const router = express.Router();

const deviceController = require('../app/controllers/device_controller');

router.get('/edit', deviceController.edit);
router.get('/detail', deviceController.detail);
router.get('/add', deviceController.add);
router.get('/', deviceController.list);

module.exports = router;