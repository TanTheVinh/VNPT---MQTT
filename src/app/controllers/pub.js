const { MqttClient } = require('mqtt');
const mqtt = require('mqtt');
const pool = require('../../config/db/database');
// const client = mqtt.connect('mqtt://localhost:1234');
// const topic = 'theVinhTest';

pool
.query(`select * from thietbi`)
.then(result => {
    const thietbi = result.rows;
    thietbi.forEach(element => {
        const user = {
            username: element.taikhoan,
            password: element.matkhau
        }
        // console.log(user);
        const client = mqtt.connect('mqtt://localhost:1234', user);
        const topic = user.username;
        client.on('connect', () => {
            client.subscribe(topic);
            var message = 'kết nối ' + element.tenthietbi;
            client.publish(topic, message);
            console.log('Thông báo gửi: ', message);
        });
            
        client.on('message', (topic, message) => {
            message = message.toString();
            console.log(message);
            if(message == 'disconnect' || !element.trangthai){
                message = 'Ngắt kết nối ' + element.tenthietbi;
                client.publish(topic, message);
                console.log('Thông báo gửi: ' + message);
                client.end();

            }

            if(message == 'reconnect'){
                message = 'Kết nối lại ' + element.tenthietbi;
                client.publish(topic, message);
                console.log('Thông báo gửi: ' + message);
                client.reconnect();
            }
                if(element.trangthai){
                    message = 'Chào thiết bị ' + element.tenthietbi;
                    setTimeout(() => {
                        client.publish(topic, message);
                        console.log('Thông báo gửi: ' + message);
                    }, 5000);
                }
        

        });
    });
})
.catch();
