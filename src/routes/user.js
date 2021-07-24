const express = require('express');
const router = express.Router();

const usercontroller = require('../app/controllers/user_controller');

 router.get('/add', usercontroller.add);
 router.post('/insert',usercontroller.insert);
 router.delete('/delete/:id', usercontroller.delete);
 router.get('/', usercontroller.list);

module.exports = router;