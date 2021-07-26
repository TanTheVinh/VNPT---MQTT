const session = require("express-session");
const md5 = require("md5");
const pool = require("../../config/db/database");

class site_controller {

    // [GET] /
    index(req, res, next){
         // console.log(req.session.idnguoidung);
        if(req.session.idnguoidung === undefined){
            res.render('login');
        }
        else{
            const soluong = {};
            pool
                .query('select count(*) as dangketnoi from thietbi where trangthai = true')
                .then(result => {
                    soluong.dangketnoi = result.rows[0].dangketnoi;
                    pool
                        .query('select count(*) as ngatketnoi from thietbi where trangthai = false')
                        .then(result => {
                            soluong.ngatketnoi = result.rows[0].ngatketnoi;
                            pool
                                .query(
                                    `select to_char(thoigiangui,'Mon') as month,
                                    extract(year from thoigiangui) as year,
                                    count(thoigiangui) as soluonglenh
                                    from dulieu group by 1,2;`
                                )
                                .then(result => {
                                    const bieudo = result.rows;
                                    // res.json({soluong, bieudo});
                                    res.render('index', { soluong, bieudo });
                                })
                                .catch(next);
                        })
                        .catch(next);
                })
                .catch(next);       
        }
    }

    // [GET] /login
    // login(req, res, next){
        
    // }
    
    // [POST] /login
    check(req, res, next){
        const account = Object.values(req.body);
        account[1] = md5(account[1]);
        pool
            .query('select * from nguoidung where taikhoan = $1 and matkhau = $2', account)
            .then(result => {
                const user = result.rows[0];
                //console.log(req.session.idnguoidung);
                try {
                    req.session.idnguoidung = user.idnguoidung;
                    req.session.iddonvi = user.iddonvi;
                    req.session.quyen = user.quyen;
                    res.redirect('/');
                } catch (error) {
                    // console.log(req.session);
                    // res.json({user})
                    res.redirect('/');
                    
                }
            })
            .catch(next);
    }

    // [GET] /change-password
    changepass(req, res, next){
        if(req.session.idnguoidung === undefined){
            res.redirect('/');
        }
        else{
            const idnguoidung = req.session.idnguoidung;
            pool
                .query(`select * from nguoidung where idnguoidung = $1`, [idnguoidung])
                .then(result => {
                    const nguoidung = result.rows[0];
                    // res.json({nguoidung});
                    // console.log({nguoidung});
                    res.render('changePassUser', { nguoidung });
                })
                .catch(next)
        }
    }
        
    
    //[PUT] /change-password
    updatepass(req, res, next){
        const doimatkhau = Object.values(req.body);
        pool
            .query(`select * from nguoidung 
                where idnguoidung = $1 and matkhau = $2`, [doimatkhau[0], doimatkhau[1]])
            .then((result) => {
                    const nguoidung = result.rows[0];
                    if(nguoidung == undefined){
                        res.redirect('change-password');
                    }
                    else{
                        pool
                            .query(`update nguoidung set matkhau = $1 
                                where idnguoidung = $2`, [doimatkhau[2], doimatkhau[0]])
                            .then((result) => {
                                res.redirect('/');
                               // req.session.destroy();

                            })
                            .catch(next);
                    }
            })
            .catch(next);
    }
    //[POST]/log-out
    logout(req,res,next){
        if(req.session.idnguoidung){
            req.session.destroy();
            res.redirect('/');
        }
    }
        
    
}

module.exports = new site_controller;