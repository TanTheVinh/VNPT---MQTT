const Pool = require('pg').Pool;

var pool = new Pool({
    host: 'localhost',
    database: 'mqtt',
    user: 'postgres',
<<<<<<< HEAD
    password: 'sa',
=======
    password: '7714119',
>>>>>>> 34dbda849e4c52bee1f7e632e1d3ea79e22b7f74
    port: 5432
});

module.exports = pool;
