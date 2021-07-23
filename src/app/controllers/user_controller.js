const pool = require("../../config/db/database");

class user_controller {

    //[GET] /list-user/
    list(req, res, next){
        pool
            .query('select * from nguoidung')
            .then(result => {
                const nguoidung = result.rows;
                // res.json({ loaithietbi });
                res.render('listUser', { nguoidung })
            })
            .catch(next)
    }
    //[GET] /list-user/detail
    detail(req, res, next){
        //res.json(req.body)
        pool
            .query('select * from nguoidung where idnguoidung = $1', [req.params.id])
            .then(result => {
                const nguoidung = result.rows[0];
            // res.json({ nguoidung});
                res.render('',{ nguoidung });
            })
            .catch(next);
    }
//[GET] /list-user/edit/:id
    edit(req, res, next){
        pool
        .query(`Select * from nguoidung where idnguoidung=$1`, [req.params.id])


        .then(result => {
            const nguoidung = result.rows[0];
            // res.json(loaithietbi);
            
            res.render('',{nguoidung});
        })
        .catch(next);
    
    }
//[PUT]/list-user/edit/:id
    update(req, res, next){
        const id = req.params.id;
        const { iddonvi, taikhoan, matkhau, } = req.body;
        pool
        .query('UPDATE loaithietbi SET tenloai = $1, mota = $2 WHERE idloai = $3', [
            tenloai,
            mota,
            id
        ])
        .then(() =>{
            res.redirect('back')
        }).catch(next);
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
                .query('INSERT INTO thietbi (tenthietbi, idloai, iddonvi taikhoan, matkhau, trangthai) '
                    + 'VALUES ($1, $2, $3, $4, $5, false)', thietbi)
                .then(() =>{
                    res.redirect('/list-device')
                })
                .catch(next);
        }
    
        // [DELETE] /list-user/delete/:id
        delete(req, res, next){
            pool
                .query('delete from nguoidung where idnguoidung = $1', [req.params.id])
                .then(() => {
                    res.redirect('back');
                })
                .catch(next);
        }

}

module.exports = new user_controller;