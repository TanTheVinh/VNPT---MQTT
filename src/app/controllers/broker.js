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

    // var id = Math.floor(Math.random() * 100);
    // var arr = [id, message];
    // if(message.slice(0, 1) != '{' && message.slice(0, 4) != 'mqtt'){
    //     var dbInsert = 'INSERT INTO mqtt(user_id, message) VALUES($1, $2)';
    //     client.query(dbInsert, arr, (err, res) => {
    //         if (err) {
    //           console.log(err.stack);
    //         } else {
    //           console.log(res.rows[0]);
    //         }
    //       });
    // }
});
