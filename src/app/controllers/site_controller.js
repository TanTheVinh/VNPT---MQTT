
class site_controller {

    index(req, res) {
        res.render('/');
    }

    search(req, res) {
        res.render('search');
    }
}

module.exports = new site_controller;