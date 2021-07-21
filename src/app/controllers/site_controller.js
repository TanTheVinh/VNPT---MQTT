const md5 = require("md5");
const pool = require("../../config/db/database");

class site_controller {

    // [GET] /
    index(req, res, next){
        const soluong = {};
        pool
            .query('select count(*) as dangketnoi from thietbi where trangthai = true')
            .then(result => {
                soluong.dangketnoi = result.rows[0].dangketnoi;
                pool
                    .query('select count(*) as ngatketnoi from thietbi where trangthai = false')
                    .then(result => {
                        soluong.ngatketnoi = result.rows[0].ngatketnoi;
                        // res.json({ soluong });
                        // console.log({soluong});
                        res.render('index', { soluong });
                    })
                    .catch(next);
            })
            .catch(next);        
    }

    // [GET] /login
    login(req, res, next){
        res.render('login');
    }
    
    // [POST] /
    check(req, res, next){
        const account = Object.values(req.body);
        account[1] = md5(account[1]);
        pool
            .query('select * from nguoidung where taikhoan = $1 and matkhau = $2', account)
            .then(result => {
                const user = result.rows[0];
                if(user === undefined){
                    res.json({user});
                    res.render('login', {user});
                }
                else{
                    res.json({user});
                    res.render('index', {user});
                }
            })
            .catch(next)
    }

    // [GET] /change-password
    change_pass(req, res, next){
        res.render('changePassword');
    }
}

module.exports = new site_controller;