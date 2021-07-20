const pool = require("../../config/db/database");

class site_controller {

    // [GET] /
    index(req, res, next){
        const soluong = {};
        pool
            .query('select count(*) as dangketnoi from thietbi where trangthai = true')
            .then(result => {
                const user = result.rows[0];
                //res.json({ user });
                res.render('index', { user });
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