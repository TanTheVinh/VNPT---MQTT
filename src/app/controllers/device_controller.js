const { query } = require("express");
const { Query } = require("pg");
const pool = require("../../config/db/database");

class device_controller {

    //[GET] /list-device/
    list(req, res, next){
        pool
            .query('select * from thietbi')
            .then(result => {
                const thietbi = result.rows;
                // res.json({ thietbi });
                res.render('listDevice', { thietbi });
                console.log({thietbi});
            })
            .catch(next)
    }

    //[GET] /list-device/detail/:id
    detail(req, res, next){
        pool
            .query('select * from thietbi where idthietbi = $1', [req.params.id])
            .then(result => {
                const thietbi = result.rows;
                // res.json({ thietbi });
                res.render('infoDevice', { thietbi });

            })
            .catch(next);
    }

    //[GET] /list-device/edit/:id
    edit(req, res, next){
        res.render('editInfoDevice');
    }

    //[GET] /list-device/add
    add(req, res, next){
        res.render('addDevice');
    }

    // [DELETE] /list-device/delete/:id
    delete(req, res, next){
        pool
            query('delete from thietbi where idthietbi = $1', [req.params.id])
    }
}

module.exports = new device_controller;