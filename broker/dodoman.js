var mqtt = require('mqtt')
 var client = mqtt.connect('mqtt://localhost:1234')
 
var topic;
var message = 'độ mặn 5/1000 ';
var username = 'doman';
var password = '27567bca0d8d0d8b29d15d5bce436b62';
var trangthai = true;
var idloai = 4;
var iddonvi = 4;
var tenthietbi = 'máy đo độ mặn nước sông';
var thietbi;
var arrTopic = [];
var arrThietbi = [];
var arrMessage = [];
var count = 100;

for(let i = 0; i < count; i++){
    topic = 'doman_' + (i+1);
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