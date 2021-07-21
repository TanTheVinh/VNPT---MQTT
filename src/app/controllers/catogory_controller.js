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
           // res.json({ loaithietbi });
            res.render('infoTypeDevice',{ loaithietbi });
        })
        .catch(next);
    }

    //[GET] /list-catogory/edit/:id
    edit(req, res, next){
        pool
        .query(`Select * from loaithietbi where idloai=${req.params.id}`)
        .then(result => {
            const loaithietbi = result.rows;
            res.json({ loaithietbi });
            //res.render('editInfoTypeDevice');
        })
        .catch(next);
        
    }
    //[PUT]/list-catogory/:id
    update(req, res, next){
        const category = req.body;
        pool
        .query(`update loaithietbi set
        tenloai = '${category.tenloai}',
        mota = '${category.mota}'
        where idloai = ${category.idloai}`)
        .then(() => {
            res.redirect('back');
        })
        .catch(next);
    }

    //[GET] /list-category/add
    add(req, res, next){        
        pool
        .query('select * from loaithietbi')
        .then(result => {
            const loaithietbi = result.rows;
            // res.json({ loaithietbi });
            res.render('addTypeDevice', { loaithietbi });
        })
        .catch(next)
    }
    //[POST] /list-category/insert
    insert(req, res, next){
        // res.json(req.body);
        // const category = req.body
        // pool
        // .query(`insert into loaithietbi(idloai, tenloai, mota) 
        // values( default, '${category.tenloai}', '${category.mota}')`)
        // .then(() => res.redirect('back'))
        // .catch(err => {
        //     err.send('them that bai')
        // });
            const category = req.body;
            let insertQuery = (`insert into loaithietbi(idloai, tenloai, mota) 
             values( default, '${category.tenloai}', '${category.mota}')`)
        
            pool.query(insertQuery, (err, result)=>{
                if(!err){
                    res.send('Insertion was successful')
                }
                else{ console.log(err.message) }
            })
            client.end;
        
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