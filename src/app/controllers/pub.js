const { MqttClient } = require('mqtt');
const mqtt = require('mqtt');
const pool = require('../../config/db/database');
// const client = mqtt.connect('mqtt://localhost:1234');
// const topic = 'theVinhTest';

pool
    .query(`select * from thietbi where idthietbi = 1`)
    .then(result => {
        const thietbi = result.rows;
        thietbi.forEach(element => {
            
            const user = {
                username: element.taikhoan,
                password: element.matkhau

            }
            const message = 'Hello '+ user.username;
            // console.log(user);
            const client = mqtt.connect('mqtt://localhost:1234', user);
            //client.end();
            // <--
            client.on('connect', () => {
                setInterval(() => {
                    // mqtt.client()
                    client.publish(user.username, message);
                    console.log('thiết bị gửi: ', message);
                }, 10000);
            });
        });
    })
    .catch();