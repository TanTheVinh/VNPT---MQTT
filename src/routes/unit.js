const express = require('express');
const router = express.Router();

const unitController = require('../app/controllers/unit_controller');


router.get('/add', unitController.add);
router.post('/insert', unitController.insert);
router.delete('/delete/:id', unitController.delete);
router.get('/', unitController.list);

module.exports = router;