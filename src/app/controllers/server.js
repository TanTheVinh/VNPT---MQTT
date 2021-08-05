const mosca = require('mosca');
const { Pool, Client } = require('pg');
const settings = {port: 1234};
const broker = new mosca.Server(settings);

module.exports = broker;

