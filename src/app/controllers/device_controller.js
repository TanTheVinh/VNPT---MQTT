const { json } = require("body-parser");
const e = require("express");
const { query } = require("express");
const { Query } = require("pg");
const pool = require("../../config/db/database");

class device_controller {

    //[GET] /list-device/
    list(req, res, next){
        pool
            .query(`select * from thietbi`)
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
        const thietbi = {};
        pool
            .query('select * from thietbi where idthietbi = $1', [req.params.id])
            .then(result => {
                thietbi.thongtin = result.rows[0];
                pool
                    .query('select * from lichsu where idthietbi = $1', [req.params.id])
                    .then(result => {
                        thietbi.lichsu = result.rows;
                        pool
                            .query('select * from dulieu where idthietbi = $1', [req.params.id])
                            .then(result => {
                                thietbi.dulieu = result.rows;
                                //res.json({ thietbi });
                                res.render('infoDevice', { thietbi });
                            })
                            .catch(next);
                    })
                    .catch(next);
            })
            .catch(next);
    }

    //[GET] /list-device/edit/:id
    edit(req, res, next){
        pool
        .query(`Select * from thietbi where idthietbi=${req.params.id}`)
            .then(result => {
                const thietbi = result.rows; 
                res.json({thietbi}) ;      
                //res.render('editInfoDevice',{ thiebi });

            })
            .catch(next);
    }
    //[PUT] list-device/edit/:id
    update(req, res, next){
        const id = req.params.id;
        const { idloai, tenthietbi, taikhoan, matkhau, trangthai } = req.body;
        pool
        .query(`update thietbi
        set idloai = $1,
        tenthietbi = $2,
        taikhoan = $3,
        matkhau = $4
        trangthai = $5
        where idthietbi = $6`, [idloai, tenthietbi, taikhoan, matkhau, trangthai, id]);
        res.json({
            message: 'chỉnh sửa thiết bị thành công'
        })
        .then(() => {
            res.redirect('list-device');
        })
        .catch(next);
    }
    //[GET] /list-device/add
    add(req, res, next){
        pool
            .query(`select * from thietbi`)
            .then(result => {
                const device = result.rows;
               //  res.json({device} );
                res.render('addDevice', { device });
                // console.log({thietbi});
            })
            .catch(next);
    }
    //[POST] /list-device/create
    create(req, res, next){
            const {idthietbi, tenthietbi, taikhoan, matkhau, trangthai } = req.body;
            pool
            .query('INSERT INTO thietbi (idloai, tenthietbi, taikhoan, matkhau, trangthai) VALUES ($1, $2, $3, $4, $5)', [ idloai, tenthietbi, taikhoan, matkhau, trangthai]);
            res.json({
                message: 'thêm thành công'
            })
            .then(() =>{
                res.redirect('list-device')
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