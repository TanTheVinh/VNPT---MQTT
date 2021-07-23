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
//[PUT]/list-catogory/edit/:id
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

}

module.exports = new user_controller;