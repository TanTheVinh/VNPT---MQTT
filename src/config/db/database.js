const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'thevinh',
    database: 'Demo'
});

module.exports = client;