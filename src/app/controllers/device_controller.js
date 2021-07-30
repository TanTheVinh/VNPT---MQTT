const pool = require("../../config/db/database");
const session = require('express-session');
const { render } = require("node-sass");
const pub = require('./pub');

class device_controller {

    //[GET] /list-device/
    list(req, res, next){
        if(req.session.idnguoidung === undefined){
            res.redirect('/');
        }
        else{
            if(req.session.quyen == 'nv'){
                const iddonvi = req.session.iddonvi;
                pool
                    .query(`select * from thietbi, loaithietbi 
                        where thietbi.idloai = loaithietbi.idloai and iddonvi = $1`, [iddonvi])
                    .then(result => {
                        const thietbi = result.rows;
                        // res.json(thietbi);
                        // console.log({thietbi});
                        res.render('listDevice', { thietbi });
                    })
                    .catch(next)
            }else{
                pool
                .query(`SELECT  thietbi.idthietbi,
                thietbi.idloai,
                thietbi.iddonvi,
                thietbi.tenthietbi,
                thietbi.taikhoan,
                thietbi.trangthai,
                loaithietbi.tenloai
            FROM thietbi INNER JOIN loaithietbi
            ON 	thietbi.idloai  = loaithietbi.idloai`)
                .then( result =>{
                    const thietbi  = result.rows;
                    res.render('listDevice', { thietbi });
                }).catch(next)
            }   
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
            .query(`select * from loaithietbi`)
            .then(result => {
                 const loaithietbi = result.rows;
               //  res.json(thietbi.loaithietbi)
                pool
                    .query(`select * from thietbi, donvi
                    where 
                    thietbi.iddonvi = donvi.iddonvi
                    and
                    idthietbi = $1`, [req.params.id])
                    .then(result =>{
                    const thietbi= result.rows[0];
                    res.render('editInfoDevice',{ thietbi, loaithietbi });
                    }).catch(next);

            }).catch(next);
        }
    }

    //[PUT] list-device/edit/:id
    update(req, res, next){
        const id = req.params.id;
        const { tenthietbi, idloai, taikhoan, trangthai } = (req.body);
        //res.json(req.body);
        pool
            .query(`UPDATE thietbi SET tenthietbi = $1, idloai = $2, taikhoan =$3, trangthai =$4  WHERE idthietbi = $5`, [tenthietbi, idloai, taikhoan, trangthai, id])
            .then(() => {
                res.render('editInfoDevice',{message: "\"sửa thành công\""});
            })
            .catch(next);
    }

    // [GET] /list-device/change-pass/:id
    changepass(req, res, next){
        if(req.session.idnguoidung === undefined){
            res.redirect('/');
        }
        else{
            const idthietbi = req.params.id;
            pool
                .query(`select * from thietbi where idthietbi = $1`, [idthietbi])
                .then(result => {
                    const thietbi = result.rows[0];
                    res.render('editPassDevice', {thietbi});
                })
                .catch(next);
        }
    }
    
    // [PUT] /list-device/change-pass/:id
    updatepass(req, res, next){
        // res.json(req.body);
        const idthietbi = req.params.id;
        const doimatkhau = Object.values(req.body);
        pool
            .query(`select * from thietbi 
                where idthietbi = $1 and matkhau = $2`, [idthietbi, doimatkhau[0]])
            .then((result) => {
                    const thietbi = result.rows[0];
                    if(thietbi == undefined){
                        // res.redirect('change-password');
                        res.render('editPassDevice', {message: 'Mật khẩu không trùng khớp'})
                    }
                    else{
                        pool
                            .query(`update thietbi set matkhau = $1 
                                where idthietbi = $2`, [doimatkhau[1], idthietbi])
                            .then((result) => {
                                // res.redirect('/');
                               // req.session.destroy();
                               res.render('editPassDevice', {message: 'Đổi mật khẩu thành công'})
                            })
                            .catch(next);
                    }
            })
            .catch(next);
    }

    //[GET] /list-device/add
    add(req, res, next){
        if(req.session.idnguoidung === undefined){
            res.redirect('/');
        }
        else{
            if(req.session.quyen == 'nv'){
                pool
                .query(`SELECT * FROM loaithietbi`)
                .then( result => {
                    const loaithietbi = result.rows;
                    pool
                    .query(`SELECT * FROM donvi where iddonvi=$1`, [req.session.iddonvi])
                    .then( result => {
                        const donvi = result.rows;
                        res.render('addDevice', {loaithietbi, donvi});
                        
                    })
                })

            }else{
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
            res.render('addDevice', {message: "\"thêm thành công\""})
            // const message = 'Thêm thiết bị thành công';
            // res.render('addDevice', {message})
            
        })
        .catch(next);
    }

    // [DELETE] /list-device/delete/:id
    delete(req, res, next){
        try{
            pool
                .query('delete from thietbi where idthietbi = $1', [req.params.id])
                .then(() => {
                    // res.redirect('back');
                    res.render('listDevice', {message: '"xóa thành công"'});
                })
                .catch(next);
        }
        catch(err){
            res.render('listDevice', {message: '"không thể xóa"'});
        }

    }

    history(req, res, next){
        res.render('publishLog');
    }

    connect(req, res, next){
        // pool
        //     .query(`select * from thietbi where idthietbi = $1`, [req.params.id])
        //     .then(result => {
        //         const thietbi = result.rows[0];
        //         var username = thietbi.taikhoan;
        //         var password = thietbi.matkhau;
        //         var message = 'ma thiet bi la :' + req.params.id.toString();
        //         pub(username, password, message);
        //         res.send('ok');
        //     })
        //     .catch(next);
    }
}

module.exports = new device_controller;