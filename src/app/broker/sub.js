// //MQTT sub
// const mqtt = require('mqtt');
// // const client = mqtt.connect('mqtt://localhost:1234');
// // const topic = 'quangThangTest';
// const user = {
//     username: 'mqtt',
//     password: '46ee7eb02d4c3b504ce79c054464bfd2'
// }
// const client = mqtt.connect('mqtt://localhost:1234', user);
// var topic = 'thevinh';

// // client.on('message', (topic, message) => {
// //     message = message.toString();
// //     console.log(message);
//     // if(message === 'check thevinh'){
//     //     client.end();
//     // }
// // });

// client.on('connect', () => {
//     client.subscribe(topic)
//     var message = 'disconnect';
//     // setInterval(() => {
//         client.publish(topic, message);
//         console.log(message);
//     // }, 1000)
//     client.end();
// });