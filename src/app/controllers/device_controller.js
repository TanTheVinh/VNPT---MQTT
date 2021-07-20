const e = require("express");
const { query } = require("express");
const { Query } = require("pg");
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
                // console.log({thietbi});
            })
            .catch(next)
    }

    //[GET] /list-device/detail/:id
    detail(req, res, next){
        pool
            .query('select * from thietbi where idthietbi = $1', [req.params.id])
            .then(result => {
                const thietbi = result.rows;
                // res.json({ thietbi });
                res.render('infoDevice', { thietbi });

            })
            .catch(next);
    }

    //[GET] /list-device/edit/:id
    edit(req, res, next){
        res.render('editInfoDevice');
        
    }

    //[GET] /list-device/add
    add(req, res, next){
        const device = req.body;
        const query_device = (`insert into thietbi(idthietbi, idloai, tenthietbi, taikhoan, matkhau, trangthai) 
        values( default, '${device.idloai}', '${device.tenthietbi}', '${device.taikhoan}', '${device.matkhau}', '${device.trangthai}' )`);
        pool.query( query_device, (err, res ) => {
            if(!err){
                res.send('thêm thành công');
            }
            else{ console.log(err.message) }

        })
            .catch(next);
       // res.render('addDevice');
    }

    // [DELETE] /list-device/delete/:id
    delete(req, res, next){
        pool
            .query('delete from thietbi where idthietbi = $1', [req.params.id])
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }
}

module.exports = new device_controller;