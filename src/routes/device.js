const express = require('express');
const router = express.Router();

const deviceController = require('../app/controllers/device_controller');

router.get('/edit/:id', deviceController.edit);
router.get('/detail/:id', deviceController.detail);
router.get('/add', deviceController.add);
router.post('/create',deviceController.create),
router.get('/', deviceController.list);
router.delete('/delete/:id', deviceController.delete);
router.put('/edit/:id', deviceController.update);
module.exports = router;