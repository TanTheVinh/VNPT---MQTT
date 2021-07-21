const siteRouter = require('./site');
const deviceRouter = require('./device');
const catogoryRouter = require('./catogory');

function route(app) {

    app.use('/list-catogory', catogoryRouter);
    app.use('/list-device', deviceRouter);
    app.use('/', siteRouter);
//    app.use('/login', loginrouter);

}

module.exports = route;