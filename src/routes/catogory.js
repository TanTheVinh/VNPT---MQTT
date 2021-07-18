const express = require('express');
const router = express.Router();

const catogoryRouter = require('../app/controllers/catogory_controller');

router.get('/detail/:id', catogoryRouter.detail);
router.get('/edit/:id', catogoryRouter.edit);
router.get('/add', catogoryRouter.add);
router.get('/', catogoryRouter.list);

module.exports = router;