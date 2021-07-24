const Pool = require('pg').Pool;

var pool = new Pool({
    host: 'localhost',
    database: 'mqtt',
    user: 'postgres',
<<<<<<< HEAD
    password: '7714119',
=======
    password: 'sa',
>>>>>>> a17e66a97b153609e1022c3a2a585cda715e220d
    port: 5432
});

module.exports = pool;
