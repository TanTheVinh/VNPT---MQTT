var mqtt = require('mqtt')
 var client = mqtt.connect('mqtt://localhost:1234')
 
var topic;
var message = 'độ ẩm 95%';
var username = 'doam';
var password = 'e6a1e7133057b1ed49dd0c94f3e5a93d';
var trangthai = true;
var idloai = 1;
var iddonvi = 1;
var tenthietbi = 'máy đo độ ẩm';
var thietbi;
var arrTopic = [];
var arrThietbi = [];
var arrMessage = [];
var count = 100;

for(let i = 0; i < count; i++){
    topic = 'doam_' + (i+1);
    thietbi = `{,${topic},${username},${password},${iddonvi},${idloai},${tenthietbi},${trangthai},}`
    arrTopic.push(topic);
    arrThietbi.push(thietbi);
}

arrTopic.forEach((element, index) => {
    const client = mqtt.connect('mqtt://localhost:1234', {username: 'doam', password: 'e6a1e7133057b1ed49dd0c94f3e5a93d', clientId: element });
        client.on('connect', ()=>{
        //  client.publish(element, arrThietbi[index]);
            setInterval(() => {
                client.publish(element, message);
                console.log('thông só gửi!', message);
            }, 5000);
                
        })
});