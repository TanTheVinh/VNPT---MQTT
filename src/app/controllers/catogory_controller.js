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

    //[GET] /list-catogory/add
    add(req, res, next){
        res.render('addTypeDevice');
    }

    // [DELETE] /list-catogory/delete/:id
    delete(req, res, next){
        pool
            .query('delete from loaithietbi where idloai = $1', [req.params.id])
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }
}

module.exports = new catogory_controller;