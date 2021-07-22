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
        pool
            .query(`select * from thietbi`)
            .then(result => {
                const device = result.rows;
                //res.json({device} );
                res.render('addDevice', { device });
                // console.log({thietbi});
            })
            .catch(next);
    }
    //[POST] /list-device/create
    create(req, res, next){
        const thietbi = req.body;
        res.json(req.body.tenthietbi);
        const query_device = (`insert into thietbi(idthietbi, idloai, tenthietbi, taikhoan, matkhau, trangthai) 
        values( default, '${thietbi.idloai}', '${thietbi.tenthietbi}', '${thietbi.taikhoan}', '${thietbi.matkhau}', '${thietbi.trangthai}' )`);
        pool.query( query_device, (err, res ) => {
            if(!err){
                res.send('thêm thành công');
                res.redirect('back');
            }
            else{ console.log("no") }

        })
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