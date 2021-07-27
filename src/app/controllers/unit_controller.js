const pool = require("../../config/db/database");

class unit_controller {


    //[GET] /list-unit/
    list(req, res, next){
        if(req.session.idnguoidung === undefined){
            res.redirect('/');
        }
        else{
            if(req.session.quyen == 'nv'){
                pool
                .query('SELECT * FROM donvi WHERE iddonvi = $1', [req.session.iddonvi])
                .then(result => {
                    const donvi = result.rows;
                res.render('listUnit', { donvi });
                })
                .catch(next)

            }
            pool
                .query('select * from donvi')
                .then(result => {
                    const donvi = result.rows;
                    const quyen = req.session.quyen;
                    // res.json({ donvi, quyen });
                    res.render('listUnit', { donvi, quyen });
                })
                .catch(next)
        }
    }

    //[GET] /list-unit/add
    add(req, res, next){    
        if(req.session.idnguoidung === undefined){
            res.redirect('/');
        }
        else{ 
            res.render('addUnit');
        }
    }

    //[POST] /list-unit/insert
    insert(req, res, next){  
       const { tendonvi } = req.body;
       if(req.session.quyen == 'nv'){
        res.render('addUnit', {message: "\"không đủ quyền\""})
       }
        pool
        .query('INSERT INTO donvi (tendonvi) VALUES ($1)', [ tendonvi ])
        .then(() =>{
            res.render('addUnit',{ message:"\"thêm thành công\""})
        }).catch(next);   
    }

    // [DELETE] /list-unit/delete/:id
    delete(req, res, next){
        try {
            pool.query('delete from donvi where iddonvi = $1', [req.params.id])
            res.redirect('back')
        } catch (error) {
            res.render('listUnit', {message: '"không thể xóa"'})
        }
    }
}
    

module.exports = new unit_controller;