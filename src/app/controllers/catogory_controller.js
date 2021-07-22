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
                const loaithietbi = result.rows[0];
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
    //[PUT]/list-catogory/edit/:id
    update(req, res, next){
        const id = req.params.id;
        const { tenloai, mota } = req.body;
        pool
        .query(`update loaithietbi
        set tenloai = $1,
        mota = $2,
        where idloai = $3`, [tenloai, mota, id])
        res.json({
            message: 'chỉnh sửa loại thiết bị thành công'
        })
        .then(() => {
            res.redirect('listTypeDevice');
        })
        .catch(next);
    }

    //[GET] /list-category/add
    add(req, res, next){     
            res.render('addTypeDevice');
    }
    //[POST] /list-category/insert
    insert(req, res, next){ 
        const { tenloai, mota } = req.body;
        pool
        .query('INSERT INTO loaithietbi (tenloai, mota) VALUES ($1, $2)', [tenloai,mota]);
        res.json({
            message: 'thêm thành công',
            body: {
                loaithietbi: {tenloai, mota}
            }
        })
        .then(() =>{
            res.redirect('list-device')
        })
        
        .catch(next);
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