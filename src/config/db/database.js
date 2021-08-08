const Pool = require('pg').Pool;

var pool = new Pool({
    host: 'localhost',
    database: 'MQTT',
    user: 'postgres',
<<<<<<< HEAD
    password: 'sa',
=======
    password: 'thevinh',
>>>>>>> 1db55909529c23c89412e8cca20c0f4cebdce232
    port: 5432
});

module.exports = pool;
