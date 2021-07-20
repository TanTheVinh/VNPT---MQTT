const pool = require("../../config/db/database");

class catogory_controller {

    //[GET] /list-catogory/
    list(req, res, next){
        pool
        .query('select * from loaithietbi')
        .then(result => {
            const loaithietbi = result.rows;
            // res.json({ loaithietbi });
            res.render('listTypeDevice', { loaithietbi });
        })
        .catch(next)
    }

    //[GET] /list-catogory/detail
    detail(req, res, next){
        pool
        .query('select * from loaithietbi where idloai = $1', [req.params.id])
        .then(result => {
            const loaithietbi = result.rows;
            //res.json({ loaithietbi });
            res.render('infoTypeDevice',{ loaithietbi });
        })
        .catch(next);
    }

    //[GET] /list-catogory/edit
    edit(req, res, next){
        res.render('editInfoTypeDevice');
    }

    //[GET] /list-category/add
    add(req, res, next){
        // pool
        // .then('select')
        // res.render('addTypeDevice');
    }
}

module.exports = new catogory_controller;