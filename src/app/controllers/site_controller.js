
class site_controller {

    // [GET] /
    index(req, res, next){
        res.render('home');
    }

    // [GET] /login
    login(req, res, next){
        res.render('login');
    }
}

module.exports = new site_controller;