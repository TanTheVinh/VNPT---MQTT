const { Pool, Client } = require('pg');

var client = new Client({
    host: 'localhost',
    database: 'Demo',
    user: 'postgres',
    password: 'thevinh',
    port: 3211
});

module.exports = client;
