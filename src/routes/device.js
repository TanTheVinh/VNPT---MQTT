const express = require('express');
const router = express.Router();

const deviceController = require('../app/controllers/device_controller');

router.get('/edit/:id', deviceController.edit);
router.get('/detail/:id', deviceController.detail);
router.get('/add', deviceController.add);
router.post('/create',deviceController.create);
router.delete('/delete/:id', deviceController.delete);
router.put('/edit/:id', deviceController.update);
router.get('/change-password/:id', deviceController.changepass);
router.put('/change-password/:id', deviceController.updatepass);
router.get('/history/:id', deviceController.historydata);
router.get('/search/:id', deviceController.searchdata);
router.post('/check/:id', deviceController.check);
router.post('/mesg/:id', deviceController.sendmessage);

router.get('/', deviceController.list);

module.exports = router;