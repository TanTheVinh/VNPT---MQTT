const { Pool, Client } = require('pg');

var client = new Client({
    host: 'localhost',
    database: 'MQTT',
    user: 'postgres',
    password: 'sa',
    port: 3211
});

module.exports = client;
