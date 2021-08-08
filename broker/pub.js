var mqtt = require('mqtt')
// var client = mqtt.connect('mqtt://localhost:1234')
 
var topic;
var message = 'Hello world';
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
var count = 1;

for(let i = 0; i < count; i++){
    topic = 'mqtt_' + (i+1);
    thietbi = `{ ${topic} ${username} ${password} ${iddonvi} ${idloai} ${tenthietbi} ${trangthai} }`
    arrTopic.push(topic);
    arrThietbi.push(thietbi);
}

arrTopic.forEach((element, index) => {
    const client = mqtt.connect('mqtt://localhost:1234', 
        {username: 'mqtt', password: '46ee7eb02d4c3b504ce79c054464bfd2', clientId: element}
    );
        client.on('connect', ()=>{
            // client.publish(element, arrThietbi[index]);
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    client.publish(element, message);
                    console.log('Message sent!', message);
                }, 1000);
                
            }
        })
});