const pool = require("../../config/db/database");
const md5 = require('md5');

class user_controller {

    //[GET] /list-user/
    list(req, res, next){
        if(req.session.idnguoidung === undefined){
            res.redirect('/');
        }
        else{
            pool
                .query(`SELECT * FROM nguoidung, donvi 
                    where nguoidung.iddonvi = donvi.iddonvi 
                    and nguoidung.iddonvi = $1`, [req.session.iddonvi])
                .then(result => {
                    const nguoidung = result.rows;
                    // res.json({ nguoidung });
                    res.render('listUser', { nguoidung })
                })
                .catch(next)
        }
    }
   
    //[GET] /list-user/add
    add(req, res, next){
        if(req.session.idnguoidung === undefined){
            res.redirect('/');
        }
        else{
            pool
                .query(`SELECT * FROM nguoidung, donvi where nguoidung.iddonvi = donvi.iddonvi`)
                .then(result => {
                    const nguoidung = result.rows;
                    //res.json({nguoidung} );
                    res.render('addUser', { nguoidung });
                    console.log({nguoidung});
                })
                .catch(next);
        }
    }
    
        // [POST] /list-user/insert
    insert(req, res, next){
        // res.json(req.body)
        const nguoidung = Object.values(req.body);
        nguoidung[2] = md5(nguoidung[2]);
        pool
        .query('INSERT INTO nguoidung (tennguoidung, taikhoan, matkhau, iddonvi, quyen) '
            + 'VALUES ($1, $2, $3, $4, $5)', nguoidung)
            //console.log(ok)
        .then(() =>{
            res.redirect('/list-user')
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