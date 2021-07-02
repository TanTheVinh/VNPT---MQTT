const newsRouter = require('./news_route');
const siteRouter = require('./site_route');

function route(app) {

    app.use('/news', newsRouter);
    app.use('/', siteRouter);
}

module.exports = route;