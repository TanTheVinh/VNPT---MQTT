const Pool = require('pg').Pool;

var pool = new Pool({
    host: 'localhost',
    database: 'Demo',
    user: 'postgres',
    password: 'thevinh',
    port: 5432
});

module.exports = pool;
