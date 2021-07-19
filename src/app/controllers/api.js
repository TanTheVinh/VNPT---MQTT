const pool = require('./conect.js')
const express = require('express');
const app = express();

app.listen(3300, ()=>{
    console.log("đã kết nối");
})

//get index
pool.connect()
app.get('/index', (req, res)=>{
    pool.query(`SELECT count(*) FROM thietbi`, (err, result)=>{
        if(!err){
            const temp = result.rows;
            res.send(result.rows);
            console.log(temp);
        }
    });
    pool.end;
})
//get produc theo id
pool.connect();
app.get('/users/:id', (req, res)=>{
    pool.query(`SELECT e.mathietbi, e.maloai, e.tenthietbi, e.diachi, e.toado, e.taikhoan, e.matkhau, c.thaotac, d.chitiet
    FROM thietbi as e
    INNER JOIN lichsu as c ON e.mathietbi = c.mathietbi
    INNER JOIN dulieu as d ON e.mathietbi = d.mathietbi
    WHERE
      c.mathietbi = ${req.params.id}
      AND
      d.mathietbi = ${req.params.id}`, (err, result)=>{
        if(!err){
            res.json(result.rows);
        }
    });
    pool.end;
})
pool.connect();
