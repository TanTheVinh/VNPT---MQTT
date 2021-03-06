const pool = require("../../config/db/database");
const session = require('express-session');
const { render } = require("node-sass");
const mqtt = require('mqtt');
const { MqttClient } = require('mqtt');

class device_controller {

    //[GET] /list-device/
    list(req, res, next) {
        if (req.session.idnguoidung === undefined) {
            res.redirect('/');
        } else {
            var page;
            if (req.session.quyen == 'nv') {
                const iddonvi = req.session.iddonvi;
                if(req.query.page === undefined){
                    page = '1';
                }else{
                    page = req.query.page;
                }
                pool
                    .query(`select * from thietbi, loaithietbi 
                        where thietbi.idloai = loaithietbi.idloai and iddonvi = $1
                        order by idthietbi ASC
                        OFFSET (($2-1)*10) ROWS FETCH NEXT 10 ROWS ONLY`, [iddonvi, page])
                    .then(result => {
                        const thietbi = result.rows;
                        pool
                            .query(`select count(*) from thietbi`)
                            .then(result => {
                                const count = result.rows[0];
                               // res.json({thietbi});
                                // console.log({thietbi, count});
                                res.render('listDevice', { thietbi, count, page });
                            })
                            .catch(next);
                    })
                    .catch(next)
            } else {
                if(req.query.page === undefined){
                    page = '1';
                }else{
                    page = req.query.page;
                }
                pool
                .query(`
                    select * from thietbi, loaithietbi 
                    where thietbi.idloai = loaithietbi.idloai
                    order by idthietbi DESC
                    OFFSET (($1-1)*10) ROWS FETCH NEXT 10 ROWS ONLY`, [page])
                .then( result =>{
                    const thietbi  = result.rows;
                    pool
                        .query(`select count(*) from thietbi`)
                        .then(result => {
                            const count = result.rows[0];
                            //res.json({thietbi,page});
                            // console.log({thietbi});
                            res.render('listDevice', { thietbi, count, page });
                            //res.json({ thietbi, count, page });
                        })
                        .catch(next);
                }).catch(next)
            }   
        }
    }

    //[GET] /list-device/detail/:id
    detail(req, res, next) {
        if (req.session.idnguoidung === undefined) {
            res.redirect('/');
        } else {
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
                                    console.log({ thietbi });
                                    res.render('infoDevice', {
                                        thietbi
                                    });
                                })
                                .catch(next);
                        })
                        .catch(next);
                })
                .catch(next);
        }
    }

    //[GET] /list-device/edit/:id
    edit(req, res, next) {
        if (req.session.idnguoidung === undefined) {
            res.redirect('/');
        } else {
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
                        .then(result => {
                            const thietbi = result.rows[0];
                            res.render('editInfoDevice', {
                                thietbi,
                                loaithietbi
                            });
                        }).catch(next);

                }).catch(next);
        }
    }

    //[PUT] list-device/edit/:id
    update(req, res, next) {
        const id = req.params.id;
        const {
            tenthietbi,
            idloai,
            taikhoan,
            matkhaucu,
            matkhaumoi,
                trangthai,
        } = (req.body);
        pool
            .query(`select * from thietbi  where idthietbi = $1 and matkhau = $2`, [id, matkhaucu])
            .then((result) => {
                const xacthuc = result.rows[0];
                if(xacthuc == undefined){
                    res.render('editInfoDevice', {
                        message: "\"m???t kh???u kh??ng ????ng\""
                    });
                    
                }else{
                    pool
                    .query(`UPDATE thietbi SET tenthietbi = $1, idloai = $2, taikhoan = $3, matkhau = $4, trangthai = $5  
                        WHERE idthietbi = $6`, [tenthietbi, idloai, taikhoan,matkhaumoi, trangthai, id])
                    .then(() => {
                        res.render('editInfoDevice', {
                            message: "\"s???a th??nh c??ng\""
                        });
                    })
                    .catch(next);
                }
            })
    }

    // [GET] /list-device/change-pass/:id
    changepass(req, res, next) {
        if (req.session.idnguoidung === undefined) {
            res.redirect('/');
        } else {
            const idthietbi = req.params.id;
            pool
                .query(`select * from thietbi where idthietbi = $1`, [idthietbi])
                .then(result => {
                    const thietbi = result.rows[0];
                    res.render('editPassDevice', {
                        thietbi
                    });
                })
                .catch(next);
        }
    }

    // [PUT] /list-device/change-pass/:id
    updatepass(req, res, next) {
        res.json(req.body);
        const idthietbi = req.params.id;
        const doimatkhau = Object.values(req.body);
        pool
            .query(`select * from thietbi 
                where idthietbi = $1 and matkhau = $2`, [idthietbi, doimatkhau[0]])
            .then((result) => {
                const thietbi = result.rows[0];
                if (thietbi == undefined) {
                    res.render('editPassDevice', {
                        message: 'M???t kh???u kh??ng tr??ng kh???p'
                    })
                } else {
                    pool
                        .query(`update thietbi set matkhau = $1 
                                where idthietbi = $2`, [doimatkhau[1], idthietbi])
                        .then((result) => {
                            res.render('editPassDevice', {
                                message: '?????i m???t kh???u th??nh c??ng'
                            })
                        })
                        .catch(next);
                }
            })
            .catch(next);
    }

    //[GET] /list-device/add
    add(req, res, next) {
        if (req.session.idnguoidung === undefined) {
            res.redirect('/');
        } else {
            if (req.session.quyen == 'nv') {
                pool
                    .query(`SELECT * FROM loaithietbi`)
                    .then(result => {
                        const loaithietbi = result.rows;
                        pool
                            .query(`SELECT * FROM donvi where iddonvi=$1`, [req.session.iddonvi])
                            .then(result => {
                                const donvi = result.rows;
                                res.render('addDevice', {
                                    loaithietbi,
                                    donvi
                                });

                            })
                    })

            } else {
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
                                    const account = {
                                        username:'mqtt_' + Math.random().toString(16).substr(2, 8),
                                        password:'mqtt' 
                                    }

                                    res.render('addDevice', {thietbi, loaithietbi, donvi,account});
                                    // console.log({loaithietbi, donvi});
                                   // res.json({account});
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
      //  res.json(req.body)
        const thietbi = req.body;
        pool
            .query(`select * from thietbi where idthietbi = $1`, [thietbi.idthietbi])
            .then(result => {
                if(result.rows[0] == undefined){
                    pool
                    .query('INSERT INTO thietbi (idthietbi, tenthietbi, iddonvi,idloai, taikhoan, matkhau, trangthai) '
                        + 'VALUES ($1, $2, $3, $4, $5, $6, false)',
                        [thietbi.idthietbi, thietbi.tenthietbi, thietbi.iddonvi, thietbi.idloai, thietbi.taikhoan, thietbi.md5matkhau] )
                    .then(() =>{
                        const message = 'Th??m thi???t b??? th??nh c??ng';
                        res.render('addDevice', {message: '"Th??m thi???t b??? th??nh c??ng"'})
                        
                    })
                    .catch(next);
                }
                else{
                    res.render('addDevice', {message: "\"tr??ng ID thi???t b???\""})
                }
            })
            .catch(next);
    }
 
    // [DELETE] /list-device/delete/:id
    delete(req, res, next) {
        pool
            .query(`SELECT * FROM dulieu FULL OUTER JOIN lichsu on dulieu.idthietbi = lichsu.idthietbi 
                where dulieu.idthietbi = $1 or lichsu.idthietbi = $2;`, [req.params.id, req.params.id]
            )
            .then((result) => {
                if(result.rows[0] == undefined){
                    pool
                        .query(`delete from thietbi where idthietbi = $1`, [req.params.id])
                        .then(() => {
                            //res.redirect('back');
                            res.render('listDevice', {message: "\"x??a th??nh c??ng\""})
                        })
                        .catch(next);
                }
                else{
                    res.render('listDevice', {
                        message: "\"kh??ng th??? x??a\""
                    });
                }
            })
            .catch(next);
    }

    // [GET] /list-device/history/:id
    // history create by thang-dev
    historydata(req, res, next) {
        var page;
        if (req.session.idnguoidung === undefined) {
            res.redirect('/');
        } else {
            const dulieu = {};
            var idthietbi = req.params.id;
            if(req.query.page === undefined){
                page = '1';
            }else{
            page = req.query.page;
            }
            pool
                .query(`
                    select  iddulieu,
                    date_part('year',thoigiangui) as nam,
                    date_part('month',thoigiangui) as thang,
                    date_part('day',thoigiangui) as ngay,
                    date_part('hour',thoigiangui) as gio,
                    date_part('minute',thoigiangui) as phut,
                    date_part('second',thoigiangui) as giay,
                    chitiet from dulieu
                    where
                    idthietbi = $1 ORDER BY thoigiangui DESC OFFSET (($2-1)*10) ROWS FETCH NEXT 10 ROWS ONLY`, [req.params.id, page]
                )
                .then(result => {
                    const dulieu = result.rows;
                    pool
                        .query(`select count(*) from dulieu where idthietbi = $1`, [req.params.id])
                            .then(result => {
                                const count = result.rows[0];
                                pool
                                    .query(`select row_number() OVER (ORDER BY iddulieu) as row
                                        from dulieu
                                        OFFSET (($1-1)*10) ROWS FETCH NEXT 10 ROWS ONLY`, [page]
                                    )
                                    .then(result => {
                                        const stt = result.rows;
                                        // res.json({idthietbi ,dulieu, count, page, stt});
                                        res.render('publishLog', {idthietbi , dulieu, count, page, stt});
                                    })
                                    .catch(next);
                                // console.log({ dulieu, count, page });
                            })
                            .catch(next);
                })
            .catch(next)
        }
    }

    // [PUT] /list-device/check
    check(req, res, next){
        const idthietbi = req.params.id;
        pool
            .query(`select * from thietbi where idthietbi = $1`, [idthietbi])
            .then(result => {
                const thietbi = result.rows[0];
                if(!thietbi.trangthai){
                    pool
                        .query(`UPDATE thietbi SET trangthai = true
                        WHERE idthietbi = $1`, [thietbi.idthietbi])
                        .then(result => {
                            res.redirect('/list-device');
                        })
                        .catch(next);
                }
                else{
                    pool
                        .query(`UPDATE thietbi SET trangthai = false
                        WHERE idthietbi = $1`, [thietbi.idthietbi])
                        .then(result => {
                            res.redirect('/list-device');
                        })
                        .catch(next);
                }
                // client.end();
            })
            .catch(next);
     }

    sendmessage(req, res, next){
        res.json(req.body);
        console.log(req);
    }

    searchdata(req, res, next){
        var page;
        if (req.session.idnguoidung === undefined) {
            res.redirect('/');
        } else {
            const dulieu = {};
            if(req.query.page === undefined){
                page = '1';
            }else{
                page = req.query.page;
            }
            const thietbi = req.query;
            var date = thietbi.date;
            const idthietbi = req.params.id;
            if(thietbi.date != ''){
                thietbi.timestart = thietbi.date + ' 00:00:00';
                thietbi.timesend = thietbi.date + ' 23:59:59';
                pool
                    .query(
                        `select  iddulieu,
                        date_part('year',thoigiangui) as nam,
                        date_part('month',thoigiangui) as thang,
                        date_part('day',thoigiangui) as ngay,
                        date_part('hour',thoigiangui) as gio,
                        date_part('minute',thoigiangui) as phut,
                        date_part('second',thoigiangui) as giay,
                        chitiet from dulieu
                        where
                        idthietbi = $1 and thoigiangui between $2 and $3
                        ORDER BY iddulieu DESC OFFSET (($4-1)*10) ROWS FETCH NEXT 10 ROWS ONLY`, 
                        [req.params.id, thietbi.timestart, thietbi.timesend, page]
                    )
                    .then(result => {
                        const dulieu = result.rows;
                        // res.json(dulieu);
                        pool
                            .query(`select count(*) from dulieu where idthietbi = $1`, [req.params.id])
                            .then(result => {
                                const count = result.rows[0];
                                pool
                                    .query(
                                        `select row_number() OVER (ORDER BY iddulieu) as row
                                        from dulieu
                                        OFFSET (($1-1)*10) ROWS FETCH NEXT 10 ROWS ONLY`, [page]
                                    )
                                    .then(result => {
                                        const stt = result.rows;
                                        // res.json({idthietbi, date, dulieu, count, page, stt});
                                        res.render('search', {idthietbi, date, dulieu, count, page, stt});
                                    })
                                    .catch(next);
                            })
                            .catch(next);
                    })
                .catch(next)
            }
            else{
                res.redirect('/list-device/history/' + idthietbi);
            }
        }
    }
}

module.exports = new device_controller;