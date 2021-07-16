
class site_controller {

    // [GET] /
    index(req, res, next){
        res.render('home');
    }

    // [GET] /search
    search(req, res, next){
        res.render('search');
    }

    // [GET] /:slug
    show(req, res, next){
        res.send('DETAIL');
    }
}

module.exports = new site_controller;