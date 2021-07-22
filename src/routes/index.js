const siteRouter = require('./site');
const deviceRouter = require('./device');
const catogoryRouter = require('./catogory');
const userRouter = require('./user');

function route(app) {

    app.use('/list-catogory', catogoryRouter);
    app.use('/list-device', deviceRouter);
  //  app.use('/list-user',userRouter);
    app.use('/', siteRouter);

}

module.exports = route;