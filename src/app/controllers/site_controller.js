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
    
    // [POST] /login
    check(req, res, next){
        const account = Object.values(req.body);
        account[1] = md5(account[1]);
        pool
            .query('select * from nguoidung where taikhoan = $1 and matkhau = $2', account)
            .then(result => {
                const user = result.rows[0];
                    // res.json({user});
                    res.render('login', {user});
            })
            .catch(next)
    }

    // [GET] /change-password
    changepass(req, res, next){
        pool
        .query('select * from nguoidung where matkhau =$1', [req.params.id])
            .then(result => {
                const nguoidung = result.rows;        
                res.render('changePassword',{nguoidung});
            })
            .catch(next);
        
    }
    //[PUT] /change-password
    updatepass(req, res, next){
        const { matkhau } = req.body;
        const id = req.params.id
        pool
        .query(`update nguoidung set
        matkhau = $1
        where idnguoidung = $2`,  [matkhau, id]);
        res.json({
            message: 'đổi mật khẩu thành công'
        })
        .then(() => {
            
            res.redirect('back');
        })
        .catch(next);
    }
}

module.exports = new site_controller;