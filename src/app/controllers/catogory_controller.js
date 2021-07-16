
class catogory_controller {

    //[GET] /list-catogory/
    list(req, res, next){
        res.render('list_catogory');
    }

    //[GET] /list-catogory/detail
    detail(req, res, next){
        res.render('detail_catogory');
    }

    //[GET] /list-catogory/edit
    edit(req, res, next){
        res.render('edit_catogory');
    }
}

module.exports = new catogory_controller;