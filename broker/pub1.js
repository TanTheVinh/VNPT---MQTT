// MQTT publisher
var mqtt = require('mqtt')
// var client = mqtt.connect('mqtt://localhost:1234', {username: 'mqtt', password: 'mqtt'});
// var topic = 'mqtt_fc2fcb2d';
var message = 'Hi World!';
var username = 'mqtt';
var password = '46ee7eb02d4c3b504ce79c054464bfd2';
// var trangthai = true;
// var idloai = 1;
// var iddonvi = 1;
// var tenthietbi = 'maytinh';
// var temp = 1;
// var thietbi = `{ ${topic} ${username} ${password} }`

// client.on('connect', () => {
//     client.publish(topic, thietbi);
//     setInterval(()=>{
//         client.publish(topic, message)
//         console.log('Message sent!', message)
//     }, 5000)
// })

var arrTopic = [];
var arrThietbi = [];
// var arrMessage = [];
var count = 1;
for(let i = 0; i < count; i++){
    topic = 'mqtt_' + (i+1);
    message = 'Hello ' + topic;
    thietbi = `( ${topic} ${username} ${password} )`;
    arrTopic.push(topic);
    arrThietbi.push(thietbi);
    // arrMessage.push(message);
}

arrTopic.forEach((element, index) => {
    const client = mqtt.connect('mqtt://localhost:1234', 
        {username: 'mqtt', password: '46ee7eb02d4c3b504ce79c054464bfd2', clientId: element}
    );
    client.on('connect', ()=>{
        // client.publish(element, arrThietbi[index]);
        setInterval(() => {
            client.publish(element, message);
            console.log('Message sent!', message);
        }, 5000);
    })
});

// var client1 = mqtt.connect('mqtt://localhost:1234')
// var topic1 = 'mqtt_0b83262e';
// var message1 = 'Hello World!';
// var username1 = 'mqtt';
// var password1 = '46ee7eb02d4c3b504ce79c054464bfd2';
// var trangthai1 = true;
// var idloai1 = 1;
// var iddonvi1 = 1;
// var tenthietbi1 = 'maytinh';
// var thietbi1 = `{ ${topic1} ${username1} ${password1} ${iddonvi1} ${idloai1} ${tenthietbi1} ${trangthai1} }`

// client1.on('connect', ()=>{
//     client1.publish(topic1, thietbi1);
//     setInterval(()=>{
//         client1.publish(topic1, message1)
//         console.log('Message sent!', message1)
//     }, 5000)
// })