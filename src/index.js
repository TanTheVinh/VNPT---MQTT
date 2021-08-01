const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const md5 = require('md5');
const app = express();
const port = 3000;
const session = require('express-session');

// lib test
const mosca = require('mosca');
const settings = {
  port: 1234
};
const server = new mosca.Server(settings);
// 

//morgan
// app.use(morgan('combined'));

const route = require('./routes/');
const pool = require('./config/db/database');
const { options } = require('./routes/site');

//Connect database
pool.connect(() => {
  console.log('connect successfully');
});

//static file
app.use(express.static(path.join(__dirname, 'resources/views')));

// post, put, delete
app.use(methodOverride('_method'))

// method post
app.use(express.urlencoded({ extended: true }));

app.engine('hbs', handlebars({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

// session
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

// test mosca
// server.on('ready',  () => {
//   console.log('Mosca server is up and running');
//   pool
//         .query(`select * from thietbi where trangthai = true`)
//         .then(result => {
//             const thietbi = result.rows[0];
//             console.log(thietbi);
//             server.authenticate = function (client, username, password, callback) {
//                 let taikhoan = thietbi.taikhoan;
//                 let matkhau = thietbi.matkhau;
//                 callback(null, (username === taikhoan && password.toString('ascii') === matkhau));
//             };
//         })
//         .catch();
// });

server.on('published', (packet, client) => {
  message = packet.payload.toString();
  topic = packet.topic.toString();
  console.log(message);
  console.log(topic);
});
// 

app.set('views', path.join(__dirname, 'resources', 'views'));

//route init
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});