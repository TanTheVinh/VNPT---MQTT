// const { MqttClient } = require('mqtt');
// const mqtt = require('mqtt');
// const pool = require('../../config/db/database');

// // class client {

// //     constructor(username, password){
// //         this.username;
// //         this.password;
// //     }

// //     getvalue(){
// //         pool
// //             .query(`select * from thietbi where thietbi = $1`, [this.idthietbi])
// //             .then(result => {
// //                 const thietbi = result.rows[0];
// //                 return thietbi;
// //             })
// //             .catch();
// //     }

// //     setclient(){
// //         const thietbi = this.getvalue();
// //         user = {
// //             username: thietbi.taikhoan,
// //             password: thietbi.matkhau
// //         }
// //         const client = mqtt.connect('mqtt://localhost:1234', user);
// //         return client;
// //     }

// //     connectmqtt() {
// //         const client = this.setclient();
// //         client.on('connect', () => {
// //             client.publish(user.username, message);
// //             console.log('Đã kết nối: ', message);
// //             message = 'check ' + user.username;
// //             setInterval(() => {
// //                 client.publish(user.username, message);
// //                 console.log('Tin nhắn gửi: check');
// //             }, 10000);
// //         })
// //     }

// // }

// // module.exports = new client;


// const user = {
//     username: 'mqtt',
//     password: '46ee7eb02d4c3b504ce79c054464bfd2'
// }
// const client = mqtt.connect('mqtt://localhost:1234', user);
// console.log(client);

// var message = user.username;
// var i = 1;
// var topic = 'thevinh'
// // console.log(client.end());

// client.on('reconnect', () => {
//     console.log('hello');
// })

// client.on('connect', () => {
//     client.subscribe(topic);
//     client.publish(topic, message);
//     console.log('Đã kết nối: ', message);
//     message = 'check ' + topic;
//     clientid = client.options.clientId;
//     if(clientid.slice(0, 1) != '{'){
//         const arr = [clientid, 1, 1, 'mqtt', 'mqtt', '46ee7eb02d4c3b504ce79c054464bfd2'];
//         pool
//             .query(`INSERT INTO thietbi(idthietbi, idloai, iddonvi, tenthietbi, taikhoan, matkhau, trangthai)
//                 VALUES ($1, $2, $3, $4, $5, $6, true);`, arr)
//             .then(result =>{
//                 console.log('Thêm thiết bị thành công');
//             })
//             .catch();
//     }
// })

// client.on('message', (topic, message) => {
//     message = message.toString();
//     console.log(message);
//     // if(message === 'check thevinh'){
//         setTimeout(() => {
//             client.publish(topic, message);
//             console.log('Tin nhắn gửi: check ' + i);
//             i++;
//         }, 1000);
//     // }
//     if(message === 'disconnect'){
//         client.end();
//     }
// });

// // // function disconnect() {
// //     setTimeout(() => {
// //         if(client.connected){
// //             console.log('ok');
// //             client.end();
// //             client.on('close', () => {
// //                 console.log('thoat');
// //             })
// //             client.on('connect', () => {
// //                 console.log('ket noi');
// //             })
// //         }
// //     }, 5000)
// // }

// // module.exports = disconnect;

