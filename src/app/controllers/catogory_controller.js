
class catogory_controller {

    //[GET] /list-catogory/
    list(req, res, next){
        res.render('listTypeDevice');
    }

    //[GET] /list-catogory/detail
    detail(req, res, next){
        res.render('infoTypeDevice');
    }

    //[GET] /list-catogory/edit
    edit(req, res, next){
        res.render('editInfoTypeDevice');
    }

    //[GET] /list-catogory/add
    add(req, res, next){
        res.render('addTypeDevice');
    }
}

module.exports = new catogory_controller;