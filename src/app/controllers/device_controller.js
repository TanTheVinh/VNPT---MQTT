const pool = require("../../config/db/database");
const session = require('express-session');

class device_controller {

    //[GET] /list-device/
    list(req, res, next){
        if(req.session.idnguoidung === undefined){
            res.redirect('/');
        }
        else{
            const iddonvi = req.session.iddonvi;
            pool
                .query(`select * from thietbi, loaithietbi 
                    where thietbi.idloai = loaithietbi.idloai and iddonvi = $1`, [iddonvi])
                .then(result => {
                    const thietbi = result.rows;
                    // res.json({thietbi});
                    console.log({thietbi});
                    res.render('listDevice', { thietbi });
                })
                .catch(next)
        }
    }

    //[GET] /list-device/detail/:id
    detail(req, res, next){
        if(req.session.idnguoidung === undefined){
            res.redirect('/');
        }
        else{
            const thietbi = {};
            pool
                .query(
                    `select * from thietbi, loaithietbi, donvi
                    where 
                    thietbi.idloai = loaithietbi.idloai 
                    and 
                    thietbi.iddonvi = donvi.iddonvi
                    and
                    idthietbi = $1`, [req.params.id]
                )
                .then(result => {
                    thietbi.thongtin = result.rows[0];
                    pool
                        .query(`select *, to_char(thoigiantt, 'dd Mon YYYY') as thoigian 
                            from lichsu where idthietbi = $1`, [req.params.id])
                        .then(result => {
                            thietbi.lichsu = result.rows;
                            pool
                                .query(`select *, to_char(thoigiangui, 'dd Mon YYYY') as thoigian
                                    from dulieu where idthietbi = $1`, [req.params.id])
                                .then(result => {
                                    thietbi.dulieu = result.rows;
                                    // res.json({ thietbi });
                                    // console.log({ thietbi });
                                    res.render('infoDevice', { thietbi });
                                })
                                .catch(next);
                        })
                        .catch(next);
                })
                .catch(next);
        }
    }

    //[GET] /list-device/edit/:id
    edit(req, res, next){
        if(req.session.idnguoidung === undefined){
            res.redirect('/');
        }
        else{
            pool
            .query(`Select * from thietbi where idthietbi=$1`, [req.params.id])
            .then(result => {
            const thietbi = result.rows[0];
            res.render('editInfoDevice',{thietbi});
            })
        .catch(next);
        }
    }

    //[PUT] list-device/edit/:id
    update(req, res, next){
        const idthietbi = req.params.id;
        const thietbi = Object.values(req.body);
        res.json(thietbi);
        pool
            .query(`update thietbi
            set idloai = $1,
            tenthietbi = $2,
            taikhoan = $3,
            matkhau = $4
            trangthai = $5
            where idthietbi = $6`, [idloai, tenthietbi, taikhoan, matkhau, trangthai, id])
            .then(() => {
                res.redirect('/list-device');
            })
            .catch(next);
    }
    
    //[GET] /list-device/add
    add(req, res, next){
        if(req.session.idnguoidung === undefined){
            res.redirect('/');
        }
        else{
            pool
                .query(`select * from loaithietbi`)
                .then(result => {
                    const loaithietbi = result.rows;
                    pool
                        .query(`select * from donvi`)
                        .then(result => {
                            const donvi = result.rows;
                            pool
                                .query(`select tenthietbi, taikhoan from thietbi`)
                                .then(result => {
                                    const thietbi = result.rows;
                                    // res.json({thietbi, loaithietbi, donvi});
                                    res.render('addDevice', {thietbi, loaithietbi, donvi});
                                    // console.log({loaithietbi, donvi});
                                })
                                .catch(next);
                        })
                        .catch(next);
                })
                .catch(next);
        }
    }

    // [POST] /list-device/create
    create(req, res, next){
        // res.json(req.body)
        const thietbi = Object.values(req.body);
        // res.json(thietbi);
        pool
        .query('INSERT INTO thietbi (tenthietbi, iddonvi,idloai, taikhoan, matkhau, trangthai) '
            + 'VALUES ($1, $2, $3, $4, $5, false)', thietbi)
        .then(() =>{
            res.redirect('/list-device')
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