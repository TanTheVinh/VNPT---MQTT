const pool = require("../../config/db/database");

class catogory_controller {

    //[GET] /list-catogory/
    list(req, res, next){
        if(req.session.idnguoidung === undefined){
            res.redirect('/');
        }
        else{
            var page;
            if(req.query.page === undefined){
                page = 1;
            }
            else{
                    page = req.query.page;
            }
            pool
                .query(`select * from loaithietbi 
                OFFSET (($1-1)*10) ROWS FETCH NEXT 10 ROWS ONLY`, [page])
                .then(result => {
                    const loaithietbi = result.rows;
                    pool
                        .query(`select count(*) from loaithietbi`)
                        .then(result => {
                            const count = result.rows[0];
                            res.render('listTypeDevice', { loaithietbi, count });
                        })
                        .catch(next);
                    //res.json({ loaithietbi });
                })
                .catch(next)
        }
    }

    //[GET] /list-catogory/detail
    detail(req, res, next){
        if(req.session.idnguoidung === undefined){
            res.redirect('/');
        }
        else{
        //res.json(req.body)
            pool
                .query('select * from loaithietbi where idloai = $1', [req.params.id])
                .then(result => {
                    const loaithietbi = result.rows[0];
                // res.json({ loaithietbi });
                    res.render('infoTypeDevice',{ loaithietbi });
                })
                .catch(next);
        }
    }

    //[GET] /list-catogory/edit/:id
    edit(req, res, next){
        if(req.session.idnguoidung === undefined){
            res.redirect('/');
        }
        else{
            pool
                .query(`Select * from loaithietbi where idloai=$1`, [req.params.id])
                .then(result => {
                    const loaithietbi = result.rows[0];
                // res.json(loaithietbi);
                
                    res.render('editInfoTypeDevice',{loaithietbi});
                })
                .catch(next);
        }
        
    }
    //[PUT]/list-catogory/edit/:id
    update(req, res, next){
        const id = req.params.id;
        const { tenloai, mota } = req.body;
        pool
        .query('UPDATE loaithietbi SET tenloai = $1, mota = $2 WHERE idloai = $3', [
            tenloai,
            mota,
            id
        ])
        .then(() =>{
            res.render('editInfoTypeDevice',{ message: "\"sửa thành công\"" });
        }).catch(next);
        
    }

    //[GET] /list-category/add
    add(req, res, next){
        if(req.session.idnguoidung === undefined){
            res.redirect('/');
        }
        else{     
            pool
                res.render('addTypeDevice');
        }
    }

    //[POST] /list-category/insert
    insert(req, res, next){ 
        // res.json({message: '"thành công"'})
        const { tenloai, mota } = req.body;
        pool
        .query('INSERT INTO loaithietbi (tenloai, mota) VALUES ($1, $2)', [tenloai,mota])
        .then(() =>{
            res.render('addTypeDevice', {message: "\"thêm thành công\""})
            //res.json(req.body);
            //res.json({message: '"thành công"'});
        }).catch(next);
    }

    // [DELETE] /list-category/delete/:id
    delete(req, res, next){
            try {
                pool
                .query('delete from loaithietbi where idloai = $1', [req.params.id])
                // res.redirect('back')
                res.render('listTypeDevice', {message: "\"xóa thành công\""})
            } catch (error) {
                res.render('listTypeDevice', {message: "\"không thể xóa\""})
            }
    }
}

module.exports = new catogory_controller;