const pool = require("../../config/db/database");
const md5 = require('md5');

class user_controller {

    //[GET] /list-user/
    list(req, res, next){
        pool
            .query('SELECT e.idnguoidung, e.tennguoidung, e.iddonvi, c.tendonvi FROM nguoidung as e LEFT JOIN donvi as c ON e.iddonvi = c.iddonvi')
            .then(result => {
                const nguoidung = result.rows;
                // res.json({ nguoidung });
                res.render('listUser', { nguoidung })
            })
            .catch(next)
    }
   
    //[GET] /list-device/add
    add(req, res, next){
        pool
            .query(`SELECT u.iddonvi, u.tendonvi, g.quyen
            FROM donvi as u
            FULL OUTER JOIN nguoidung as g ON u.iddonvi = g.iddonvi`)
            .then(result => {
                const nguoidung = result.rows;
                //res.json({nguoidung} );
                res.render('addUser', { nguoidung });
                    //console.log({nguoidung});
            })
            .catch(next);
    }
    
        // [POST] /list-device/insert
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