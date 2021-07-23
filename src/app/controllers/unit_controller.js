const pool = require("../../config/db/database");

class unit_controller {


    //[GET] /list-unit/
    list(req, res, next){
        pool
            .query('select * from donvi')
            .then(result => {
                const donvi = result.rows;
                // res.json({ loaithietbi });
                res.render('listUnit', { donvi });
            })
            .catch(next)
    }

}
    

module.exports = new unit_controller;