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
        pool
        .query('select * from thietbi where idthietbi = $1', [req.params.id])
            .then(result => {
                const thietbi = result.rows;        
                res.render('editInfoDevice',{ thiebi });

            })
            .catch(next);
    }
    //[PUT] list-device/:id
    update(req, res, next){
        const thietbi = req.body;
        pool
        .query(`update thietbi
        set idloai = '${thietbi.idloai}',
        tenthietbi = '${thietbi.tenthietbi}',
        taikhoan = '${thietbi.taikhoan}'
        matkhau = '${thietbi.matkhau}'
        trangthai = '${thietbi.trangthai}'
        where idthietbi = ${thietbi.idthietbi}`)
        .then(() => {
            res.redirect('back');
        })
        .catch(next);
    }
    //[GET] /list-device/add
    add(req, res, next){
        const thietbi = req.body;
        const query_device = (`insert into thietbi(idthietbi, idloai, tenthietbi, taikhoan, matkhau, trangthai) 
        values( default, '${thietbi.idloai}', '${thietbi.tenthietbi}', '${thietbi.taikhoan}', '${thietbi.matkhau}', '${thietbi.trangthai}' )`);
        pool.query( query_device, (err, res ) => {
            if(!err){
                res.send('thêm thành công');
                res.redirect('back');
            }
            else{ console.log(err.message) }

        })
            .catch(next);
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