var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1234')
 
var topic;
var message;
var username = 'mqtt';
var password = '46ee7eb02d4c3b504ce79c054464bfd2';
var trangthai = true;
var idloai = 1;
var iddonvi = 1;
var tenthietbi = 'maytinh';
var thietbi;
var arrTopic = [];
var arrThietbi = [];
var arrMessage = [];
var count = 1000;

for(let i = 0; i < count; i++){
    topic = 'mqtt_' + (i+1);
    message = 'Hello ' + topic;
    thietbi = `{ ${topic} ${username} ${password} ${iddonvi} ${idloai} ${tenthietbi} ${trangthai} }`
    arrTopic.push(topic);
    arrThietbi.push(thietbi);
    arrMessage.push(message);
}

arrTopic.forEach((element, index) => {
    const client = mqtt.connect('mqtt://localhost:1234');
        client.on('connect', ()=>{
            client.publish(element, arrThietbi[index]);
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    client.publish(element, message);
                    console.log('Message sent!', arrMessage[index]);
                }, 1000);
                
            }
        })
});