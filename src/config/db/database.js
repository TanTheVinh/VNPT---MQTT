const Pool = require('pg').Pool;

var pool = new Pool({
    host: 'localhost',
    database: 'mqtt',
    user: 'postgres',
<<<<<<< HEAD
    password: 'sa',
=======
    password: '7714119',
>>>>>>> 4fdc63d86866c09b2c92857f4d5858957dc3b9a8
    port: 5432
});

module.exports = pool;
