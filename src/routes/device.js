const express = require('express');
const router = express.Router();

const deviceController = require('../app/controllers/device_controller');

router.get('/edit/:id', deviceController.edit);
router.get('/detail/:id', deviceController.detail);
router.get('/add', deviceController.add);
router.get('/', deviceController.list);
router.delete('/delete/:id', deviceController.delete);

module.exports = router;