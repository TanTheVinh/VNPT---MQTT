const Pool = require('pg').Pool;

var pool = new Pool({
    host: 'localhost',
    database: 'MQTT',
    user: 'postgres',
<<<<<<< HEAD
    password: 'sa',
=======
<<<<<<< HEAD
    password: 'thevinh',
=======
    password: '7714119',
>>>>>>> c565079c12e3bd8e2e17b1c2fcfd26b0debd1352
>>>>>>> 6283ee4e8d14afaf7bc1d6eeb6ac0d72b6e9dc3f
    port: 5432
});

module.exports = pool;
