const pool = require("./conect");

class site_controller {

    // [GET] /
    index(req, res, next){
        // res.render('home');
        pool
        .query (`SELECT count(*) FROM thietbi`)
        .then (result =>{
            const temp = result.rows[0];
           // res.json({temp});
            res.render('home',{temp});
        })
        .catch(next); 
    }

    // [GET] /login
    login(req, res, next){
        res.render('login');
    }
}

module.exports = new site_controller;