const pool = require("../../config/db/database");

class device_controller {

    //[GET] /list-device/
    list(req, res, next){
        pool
            .query('select * from thietbi')
            .then(result => {
                const thietbi = result.rows;
                // res.json({ thietbi });
                res.render('listDevice', { thietbi });
            })
            .catch(next)
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
        const divice = req.body;
        const add_device = ('insert into thietbi( idthietbi, idloai, tenthietbi, taikhoan, matkhau, trangthai) values (')
        res.render('addDevice');
    }
}

module.exports = new device_controller;