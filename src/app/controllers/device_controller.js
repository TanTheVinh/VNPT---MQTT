const pool = require("../../config/db/database");

class device_controller {

    //[GET] /list-device/
    list(req, res, next){
        pool
            .query(`select * from thietbi, loaithietbi 
                where thietbi.idloai = loaithietbi.idloai`)
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
            .query(
                `select * from thietbi, loaithietbi 
                where 
                thietbi.idloai = loaithietbi.idloai 
                and 
                idthietbi = $1`, [req.params.id]
            )
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
                                // res.json({ thietbi });
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
        .query(`Select * from thietbi where idthietbi=$1`, [req.params.id])
        .then(result => {
           const thietbi = result.rows[0];
          res.render('editInfoDevice',{thietbi});
        })
       .catch(next);
    }

    //[PUT] list-device/edit/:id
    update(req, res, next){
        const idthietbi = req.params.id;
        const thietbi = Object.values(req.body);
        res.json(thietbi);
        // pool
        //     .query(`update thietbi
        //     set idloai = $1,
        //     tenthietbi = $2,
        //     taikhoan = $3,
        //     matkhau = $4
        //     trangthai = $5
        //     where idthietbi = $6`, [idloai, tenthietbi, taikhoan, matkhau, trangthai, id])
        //     .then(() => {
        //         res.redirect('/list-device');
        //     })
        //     .catch(next);
    }
    //[GET] /list-device/add
    add(req, res, next){
        pool
            .query(`select * from loaithietbi`)
            .then(result => {
                const loaithietbi = result.rows;
                //res.json({device} );
                res.render('addDevice', { loaithietbi });
                 console.log({loaithietbi});
            })
            .catch(next);
    }

    // [POST] /list-device/create
    create(req, res, next){
        // res.json(req.body)
            const thietbi = Object.values(req.body);
            thietbi[3] = md5(thietbi[3]);
            // res.json(thietbi);
            pool
            .query('INSERT INTO thietbi (tenthietbi, idloai, taikhoan, matkhau, trangthai) '
                + 'VALUES ($1, $2, $3, $4, false)', thietbi)
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