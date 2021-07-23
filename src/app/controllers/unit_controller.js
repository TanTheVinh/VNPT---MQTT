const pool = require("../../config/db/database");

class unit_controller {


    //[GET] /list-unit/
    list(req, res, next){
        pool
            .query('select * from donvi')
            .then(result => {
                const donvi = result.rows;
                //res.json({ donvi });
                res.render('listUnit', { donvi });
            })
            .catch(next)
    }
    //[GET] /list-unit/add
    add(req, res, next){     
        res.render('addUnit');
    }
    //[POST] /list-unit/insert
    insert(req, res, next){  
        //res.json(req.body)
       const { tendonvi } = req.body;
        pool
        .query('INSERT INTO donvi (tendonvi) VALUES ($1)', [ tendonvi ])
        
        .then(() =>{
            res.redirect('/list-unit')
            res.json({
                message: 'thêm thành công',
                body: {
                    donvi: { tendonvi }
                }
            })
        }).catch(next);   
    }
    // [DELETE] /list-unit/delete/:id
    delete(req, res, next){
        
        // pool
        //     .query('delete from donvi where iddonvi = $1', [req.params.id])
        //     .then(() => {
        //         res.redirect('back');
        //     })
        //     .catch(next);
    }
}
    

module.exports = new unit_controller;