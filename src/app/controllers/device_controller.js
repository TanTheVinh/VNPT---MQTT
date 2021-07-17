
class device_controller {

    //[GET] /list-device/
    list(req, res, next){
        res.render('listDevice');
    }

    //[GET] /list-device/detail
    detail(req, res, next){
        res.render('infoDevice');
    }

    //[GET] /list-device/edit
    edit(req, res, next){
        res.render('editInfoDevice');
    }

    //[GET] /list-device/add
    add(req, res, next){
        res.render('addDevice');
    }
}

module.exports = new device_controller;