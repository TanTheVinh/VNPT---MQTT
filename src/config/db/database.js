const Pool = require('pg').Pool;

var pool = new Pool({
    host: 'localhost',
    database: 'MQTT',
    user: 'postgres',
<<<<<<< HEAD
<<<<<<< HEAD
    password: 'sa',
=======
    password: '7714119',
>>>>>>> 4fdc63d86866c09b2c92857f4d5858957dc3b9a8
=======
    password: 'thevinh',
>>>>>>> 2eb066760c343febd93df6b2d5eeb360a6687b8c
    port: 5432
});

module.exports = pool;
