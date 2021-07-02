const express = require('express');
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');
const sass = require('node-sass');
const port = 3000;
const app = express();

const route = require('./routes/index_route');

app.use(express.static(path.join(__dirname, 'public')));

//HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine('hbs', handlebars({extname: 'hbs'}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// route init
route(app);

app.listen(port, () => {
    console.log(`listen http://localhost:${port}`);
});