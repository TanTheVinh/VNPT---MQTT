const Pool = require('pg').Pool;

var pool = new Pool({
    host: 'localhost',
    database: 'mqtt',
    user: 'postgres',
<<<<<<< HEAD
    password: 'sa',
=======
    password: '7714119',
>>>>>>> 73a87e5d593d17139db25b5017aea735668e2321
    port: 5432
});

module.exports = pool;
