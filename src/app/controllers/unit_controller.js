const pool = require("../../config/db/database");

class unit_controller {


    //[GET] /list-unit/
    list(req, res, next){
        if(req.session.idnguoidung === undefined){
            res.redirect('/');
        }
        else{
            var page;
            const quyen = req.session.quyen;
            if(req.session.quyen == 'nv'){
                if(req.query.page === undefined){
                    page = '1';
                }
                else{
                    page = req.query.page;
                }
                pool
                .query(`SELECT * FROM donvi WHERE iddonvi = $1
                    OFFSET (($2-1)*10) ROWS FETCH NEXT 10 ROWS ONLY`, [req.session.iddonvi, page])
                .then(result => {
                    const donvi = result.rows;
                    pool
                        .query(`select count(*) from donvi`)
                        .then(result => {
                            const count = result.rows[0];
                            //res.json({donvi, count});
                            res.render('listUnit', { donvi, quyen, count,page});
                        })
                        .catch(next);
                })
                .catch(next)

            }
            else{
                if(req.query.page === undefined){
                    page = '1';
                }
                else{
                    page = req.query.page;
                }
                pool
                .query(`select * from donvi
                OFFSET (($1-1)*10) ROWS FETCH NEXT 10 ROWS ONLY`, [page])
                .then(result => {
                    const donvi = result.rows;
                    pool
                        .query(`select count(*) from donvi`)
                        .then(result => {
                            const count = result.rows[0];
                            //res.json({ donvi, quyen, count });
                            res.render('listUnit', { donvi, quyen, count, page });
                        })
                        .catch(next);
                })
                .catch(next)
            }
 
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
        // res.json({thietbi});
        pool
            .query(`SELECT * FROM nguoidung
                FULL OUTER JOIN thietbi on nguoidung.iddonvi = thietbi.iddonvi 
                where thietbi.iddonvi = $1 or nguoidung.iddonvi = $2;`, 
                [req.params.id, req.params.id]
            )
            .then((result) => {
                if(result.rows[0] == undefined){
                    pool
                        .query(`delete from donvi where iddonvi = $1`, [req.params.id])
                        .then(result => {
                            res.render('listUnit', {message: "\"Xóa thành công\""});
                        })
                }
                else{
                    res.render('listUnit', {message: "\"Không thể xóa\""});
                }
            })
            .catch(next);
        
        //res.redirect('back');
        
    }
}
    

module.exports = new unit_controller;