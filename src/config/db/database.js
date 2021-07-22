const Pool = require('pg').Pool;

var pool = new Pool({
    host: 'localhost',
    database: 'mqtt',
    user: 'postgres',
<<<<<<< HEAD
    password: 'thevinh',
=======
    password: '7714119',
>>>>>>> c565079c12e3bd8e2e17b1c2fcfd26b0debd1352
    port: 5432
});

module.exports = pool;
