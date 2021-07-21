//MQTT broker
const mosca = require('mosca');
const { Pool, Client } = require('pg');
const settings = {port: 1234};
const broker = new mosca.Server(settings);
const db = require('../../config/db/database');

db.connect(() => {
    console.log('connected');
});

broker.on('ready', () => {
    console.log('Broker is ready!');
});

broker.on('published', (packet) => {
    message = packet.payload.toString();
    console.log(message);
    console.log(packet.topic.toString());

});
