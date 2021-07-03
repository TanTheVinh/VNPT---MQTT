
class new_controller {

    index(req, res) {
        db.query(`select * from users`, (err, res) => {
            if(!err) {
                console.log(res.rows);
            }
        });
        // res.render('news');
    }

    // [GET] /news/::slug
    show(req, res) {
        res.send('NEWS DETAIL');
    }
}

module.exports = new new_controller;