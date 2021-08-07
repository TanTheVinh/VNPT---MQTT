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
        // const topic = user.username;
        var temp;
        if(element.trangthai){
            temp = true;
        }
        // client.on('connect', () => {
        //     client.subscribe(topic);
        //     var message = 'kết nối ' + element.tenthietbi;
        //     if(temp == 1){
        //         setInterval(() => {
        //             client.publish(topic, message);
        //             console.log('Thông báo gửi: ' + message);
        //             console.log(temp);
        //         }, 5000);
        //     }
        //     if(temp == 0){
        //         client.end();
        //     }
        // });

        // client.on('message', (topic, message) => {
        //     message = message.toString();
        //     if(message == 'disconnect'){
        //         temp = 0;
        //     }

        //     if(message == 'reconnect'){
        //         temp = 1;
        //     }
        // })

        client.on('connect', () => {
            client.subscribe(topic);
            var message = 'kết nối ' + element.tenthietbi;
            client.publish(topic, message);
            console.log('Thông báo gửi: ', message);
        });
            
        client.on('message', (topic, message) => {
            message = message.toString();

            if(message == 'disconnect'){
                message = 'Ngắt kết nối ' + element.tenthietbi;
                client.publish(topic, message);
                console.log('Thông báo gửi: ' + message);
                temp = false;
            }

            if(temp == true){
                message = 'Chào thiết bị ' + element.tenthietbi;
                setTimeout(() => {
                    client.publish(topic, message);
                    console.log('Thông báo gửi: ' + message);
                }, 5000);
            }
            
            if(message == 'reconnect'){
                message = 'Kết nối lại ' + element.tenthietbi;
                client.publish(topic, message);
                console.log('Thông báo gửi: ' + message);
                temp = true;
            }
        });

        client.on('end', (topic, message) => {
            if(message == 'reconnect'){
                message = 'Kết nối lại ' + element.tenthietbi;
                client.publish(topic, message);
                console.log('Thông báo gửi: ' + message);
                client.reconnect();
            }
        })
    });
})
.catch();
