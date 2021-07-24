const express = require('express');
const router = express.Router();

const unitController = require('../app/controllers/unit_controller');


router.get('/', unitController.list);
router.get('/add', unitController.add);
router.post('/insert', unitController.insert);
router.delete('/delete/:id', unitController.delete);

module.exports = router;