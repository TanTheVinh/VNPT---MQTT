//MQTT broker
const mosca = require('mosca');
const { Pool, Client } = require('pg');
// const settings = {port: 1234};
// const broker = new mosca.Server(settings);
const broker = require('./server');
const pool = require('../../config/db/database');

pool.connect(() => {
    console.log('connected');
});

broker.on('ready', () => {
    console.log('Broker is ready!');
    // broker.authenticate = function (client, username, password, callback) {
    //     callback(null, (username === 'mqtt' && password.toString('ascii') === '46ee7eb02d4c3b504ce79c054464bfd2'));
    //     console.log(client);
    // }
});

broker.on('published', (packet, client) => {
    message = packet.payload.toString();
    client = packet.topic.toString();
    console.log(message);
    console.log(client);
    
    // if(message.slice(0, 1) == '{' && message.slice(0, 4) == 'mqtt' && client.slice(13, 16) == 'new'){
    //     clientid = message.slice(0, 15);
    // }
});

// broker.on('clientConnected', (client) => {
//     const arr = [client.id, 1, 1, 'mqtt', 'mqtt', '46ee7eb02d4c3b504ce79c054464bfd2'];
//     pool
//         .query(`INSERT INTO thietbi(idthietbi, idloai, iddonvi, tenthietbi, taikhoan, matkhau, trangthai)
//             VALUES ($1, $2, $3, $4, $5, $6, true);`, arr)
//         .then(result =>{
//             console.log('Thêm thiết bị thành công');
//         })
//         .catch();
// })
