const mosca = require('mosca');
const { Pool, Client } = require('pg');
// const settings = {port: 1234};
// const broker = new mosca.Server(settings);
// const broker = require('./server');
const pool = require('../../config/db/database');
const mqtt = require('mqtt');

const user = {
    username: 'mqtvv',
    password: '46ee7eb02d4c3b504ce79c054464bfd2',
    // clientid: 'mqttjs_66c7c74c'
}
const client = mqtt.connect('mqtt://localhost:1234', user);

    setTimeout(() => {
        if(client.connected){
            console.log('ok');
            client.end();
            client.on('close', () => {
                console.log('thoat');
            })
        }
    }, 1000)