
class device_controller {

    //[GET] /list-device/
    list(req, res, next){
        res.render('list_device');
    }

    //[GET] /list-device/detail
    detail(req, res, next){
        res.render('detail_device');
    }

    //[GET] /list-device/edit
    edit(req, res, next){
        res.render('edit_device');
    }
}

module.exports = new device_controller;