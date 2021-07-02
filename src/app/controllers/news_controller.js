
class new_controller {

    index(req, res) {
        res.render('news');
    }

    // [GET] /news/::slug
    show(req, res) {
        res.send('NEWS DETAIL');
    }
}

module.exports = new new_controller;