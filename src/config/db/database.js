const Pool = require('pg').Pool;

var pool = new Pool({
    host: 'localhost',
    database: 'mqtt',
    user: 'postgres',
    password: 'thevinh',
    port: 5432
});

module.exports = pool;
