var mqtt = require('mqtt')
 var client = mqtt.connect('mqtt://localhost:1234')
 
var topic;
var message = 'nhiệt độ 31';
var username = 'nhietdo';
var password = '4c2bc155a4b790aa9070080633b02855';
var trangthai = true;
var idloai = 2;
var iddonvi = 2;
var tenthietbi = 'máy đo nhiệt độ';
var thietbi;
var arrTopic = [];
var arrThietbi = [];
var arrMessage = [];
var count = 100;

for(let i = 0; i < count; i++){
    topic = 'nhietke_' + (i+1);
    thietbi = `{,${topic},${username},${password},${iddonvi},${idloai},${tenthietbi},${trangthai},}`
    arrTopic.push(topic);
    arrThietbi.push(thietbi);
}

arrTopic.forEach((element, index) => {
    const client = mqtt.connect('mqtt://localhost:1234', { clientId: element });
        client.on('connect', ()=>{
            client.publish(element, arrThietbi[index]);
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    client.publish(element, message);
                    console.log('thông só gửi!', message);
                }, 5000);
                
            }
        })
});