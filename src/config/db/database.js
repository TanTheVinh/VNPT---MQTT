const Pool = require('pg').Pool;

var pool = new Pool({
    host: 'localhost',
    database: 'MQTT',
    user: 'postgres',
    password: 'sa',
    port: 5432
});

module.exports = pool;
