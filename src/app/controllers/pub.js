const { MqttClient } = require('mqtt');
const mqtt = require('mqtt');
const pool = require('../../config/db/database');
// const client = mqtt.connect('mqtt://localhost:1234');
// const topic = 'theVinhTest';

pool
    .query(`select * from thietbi where trangthai = true`)
    .then(result => {
        const thietbi = result.rows;
        thietbi.forEach(element => {
            const message = 'Hello world!';
            const user = {
                username: element.taikhoan,
                password: element.matkhau
            }
            // console.log(user);
            const client = mqtt.connect('mqtt://localhost:1234', user);
            // <--
            client.on('connect', () => {
                setInterval(() => {
                    // mqtt.client()
                    client.publish(user.username, message);
                    console.log('Message sent: ', message);
                }, 10000);
            });
        });
    })
    .catch();