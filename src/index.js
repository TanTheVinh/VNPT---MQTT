const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const md5 = require('md5');
const app = express();
const port = 3000;

const route = require('./routes/');
const db = require('./config/db/database');

//Connect database
db.connect(() => {
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

app.set('views', path.join(__dirname, 'resources', 'views'));

//route init
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});