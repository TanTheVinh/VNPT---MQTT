const pool = require("../../config/db/database");

class site_controller {

    // [GET] /
    index(req, res, next){
        const soluong = {};
        pool
            .query('select count(*) as dangketnoi from thietbi where trangthai = true')
            .then(result => {
<<<<<<< HEAD
                const user = result.rows[0];
                //res.json({ user });
                res.render('index', { temp });
=======
                soluong.dangketnoi = result.rows[0].dangketnoi;
                pool
                    .query('select count(*) as ngatketnoi from thietbi where trangthai = false')
                    .then(result => {
                        soluong.ngatketnoi = result.rows[0].ngatketnoi;
                        res.json({ soluong });
                        // res.render('index', { soluong });
                    })
                    .catch(next);
>>>>>>> fd8f1216110b0b85e91ef0cbefed11294daa3380
            })
            .catch(next);        
    }

    // [GET] /login
    login(req, res, next){
        res.render('login');
    }   

    // [GET] /change-password
    changepass(req, res, next){
        res.render('changePassword');
    }
}

module.exports = new site_controller;