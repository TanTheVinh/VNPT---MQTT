const { text } = require("express");
const pool = require("../../config/db/database");

class site_controller {

    // [GET] /
    index(req, res, next){
        pool
            .query('select * from users where id = 1')
            .then(result => {
                const temp = result.rows[0];
                res.render('index', { temp });
            })
            .catch(next)
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