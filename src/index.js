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

const route = require('./routes/');
const pool = require('./config/db/database');
const { options } = require('./routes/site');
const publish = require('./app/controllers/pub');

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
server.on('ready',  () => {
  console.log('Mosca server is up and running');
  // server.authenticate = function (client, username, password, callback) {
  //     callback(null, (username === 'mqtt' && password.toString('ascii') === '46ee7eb02d4c3b504ce79c054464bfd2'));
  // };
});

server.on('published', (packet, client) => {
  message = packet.payload.toString();
  topic = packet.topic.toString();
  console.log('nhận từ server: '+ message);
  console.log('từ thiết bị:'+ topic);
});
// 

app.set('views', path.join(__dirname, 'resources', 'views'));

//route init
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});