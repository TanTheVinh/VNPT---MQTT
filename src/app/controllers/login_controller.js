
class news_controller {
    
    // [GET] /login
    index(req, res){
        res.render('login');
    }

    // [GET] /:slug
    show(req, res){
        res.send('DETAIL');
    }


}

module.exports = new news_controller;