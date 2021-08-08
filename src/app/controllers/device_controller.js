const pool = require("../../config/db/database");
const session = require('express-session');
const { render } = require("node-sass");
const mqtt = require('mqtt');
//const connectmqtt = require('./pub');
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
                .query(`select * from thietbi, loaithietbi 
                where thietbi.idloai = loaithietbi.idloai
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
            trangthai
        } = (req.body);
        //res.json(req.body);
        pool
            .query(`UPDATE thietbi SET tenthietbi = $1, idloai = $2, taikhoan =$3, trangthai =$4  
            WHERE idthietbi = $5`, [tenthietbi, idloai, taikhoan, trangthai, id])
            .then(() => {
                res.render('editInfoDevice', {
                    message: "\"sửa thành công\""
                });
            })
            .catch(next);
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
        // res.json(req.body);
        const idthietbi = req.params.id;
        const doimatkhau = Object.values(req.body);
        pool
            .query(`select * from thietbi 
                where idthietbi = $1 and matkhau = $2`, [idthietbi, doimatkhau[0]])
            .then((result) => {
                const thietbi = result.rows[0];
                if (thietbi == undefined) {
                    // res.redirect('change-password');
                    res.render('editPassDevice', {
                        message: 'Mật khẩu không trùng khớp'
                    })
                } else {
                    pool
                        .query(`update thietbi set matkhau = $1 
                                where idthietbi = $2`, [doimatkhau[1], idthietbi])
                        .then((result) => {
                            // res.redirect('/');
                            // req.session.destroy();
                            res.render('editPassDevice', {
                                message: 'Đổi mật khẩu thành công'
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
        
        //console.log(thietbi.taikhoan, thietbi.kiemtratk, thietbi.matkhau, thietbi.kiemtramk);
        if(thietbi.taikhoan == thietbi.kiemtratk && thietbi.md5matkhau == thietbi.kiemtramk){
            pool
            .query('INSERT INTO thietbi (tenthietbi, iddonvi,idloai, taikhoan, matkhau, trangthai) '
                + 'VALUES ($1, $2, $3, $4, $5, true)',
                [thietbi.tenthietbi, thietbi.iddonvi, thietbi.idloai, thietbi.taikhoan, thietbi.md5matkhau] )
            .then(() =>{
                
                res.render('addDevice', {message: "\"thêm thành công\""})
                const user = {
                    username: thietbi.taikhoan,
                    password: thietbi.md5matkhau
                }
                const client = mqtt.connect('mqtt://localhost:1234', user);
                const message = 'Hello world!';
                // <--
                client.on('connect', () => {
                    setInterval(() => {
                        client.publish(user.username, message);
                        console.log('Message sent: ', message);
                    }, 5000);                   
                });
                // const message = 'Thêm thiết bị thành công';
                // res.render('addDevice', {message})
                
            })
            .catch(next);
        }else{
            res.render('addDevice', {message: "\"thêm thất bại\""})
        }
    }
 
    // [DELETE] /list-device/delete/:id
    delete(req, res, next) {
        try {
            pool
                .query('delete from thietbi where idthietbi = $1', [req.params.id])
                .then(() => {
                    //res.redirect('back');
                    res.render('listDevice', {message: "\"xóa thành công\""})
                })
                .catch(next);
        } catch (err) {
            res.render('listDevice', {
                message: '"không thể xóa"'
            });
        }
    }

    // [GET] /list-device/history/:id
    // history create by thang-dev
    historydata(req, res, next) {
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
            pool
                .query(`select  iddulieu,
                                date_part('year',thoigiangui) as nam,
                                date_part('month',thoigiangui) as thang,
                                date_part('day',thoigiangui) as ngay,
                                date_part('hour',thoigiangui) as gio,
                                date_part('minute',thoigiangui) as phut,
                                date_part('second',thoigiangui) as giay,
                                chitiet from dulieu
                    where
                    idthietbi = $1 ORDER BY iddulieu  DESC OFFSET (($2-1)*10) ROWS FETCH NEXT 10 ROWS ONLY`, [req.params.id, page]
                )
                .then(result => {
                    const dulieu = result.rows;
                    pool
                        .query(`select count(*) from dulieu where idthietbi = $1`, [req.params.id])
                            .then(result => {
                                const count = result.rows[0];
                                console.log({ dulieu, count, page });
                                //res.json({ dulieu, count, page });
                                res.render('publishLog', {dulieu, count, page});
                            })
                            .catch(next);
                })
            .catch(next)
        }
    }

    // [POST] /list-device/login
    // login(req, res, next){
    //     const account = Object.values(req.body);
    //     account.unshift(req.params.id);
    //     pool
    //         .query(`select * from thietbi where 
    //         idthietbi = $1 and taikhoan = $2 and matkhau = $3`, account)
    //         .then(result => {
    //             try {
    //                 const thietbi = result.rows[0];
    //                 var username = thietbi.taikhoan;
    //                 var password = thietbi.matkhau;
    //                 var message = 'ma thiet bi la :' + req.params.id.toString();
    //                 pub(username, password, message);
    //             } catch (error) {
    //                 res.render('list-device', {message: 'tài khoản hoặc mật khẩu không đúng'})
    //             }
    //         })
    //         .catch(next);
    // }

    // [PUT] /list-device/check
    check(req, res, next){
        const idthietbi = req.params.id;
        pool
            .query(`select * from thietbi where idthietbi = $1`, [idthietbi])
            .then(result => {
                const thietbi = result.rows[0];
                pool
                const user = {
                    username: thietbi.taikhoan,
                    password: thietbi.matkhau
                }
                const client = mqtt.connect('mqtt://localhost:1234', user);
                if(!thietbi.trangthai){
                    client.on('connect', () => {
                        var message = 'reconnect';
                        client.publish(user.username, message);
                        client.end();
                    });
                    pool
                        .query(`UPDATE thietbi SET trangthai = true
                        WHERE idthietbi = $1`, [thietbi.idthietbi])
                        .then(result => {
                            res.redirect('/list-device');
                        })
                        .catch(next);
                }
                else{
                    client.on('connect', () => {
                        var message = 'disconnect';
                        client.publish(user.username, message);
                        client.end();
                    });
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

}

module.exports = new device_controller;