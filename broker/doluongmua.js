var mqtt = require('mqtt')
 var client = mqtt.connect('mqtt://localhost:1234')
 
var topic;
var message = 'lượng mưa 50mm ';
var username = 'luongmua';
var password = 'a5a184f2e93bbd8700f49c5913955496';
var trangthai = true;
var idloai = 3;
var iddonvi = 3;
var tenthietbi = 'máy đo lượng mưa';
var thietbi;
var arrTopic = [];
var arrThietbi = [];
var arrMessage = [];
var count = 100;

for(let i = 0; i < count; i++){
    topic = 'luongmua_' + (i+1);
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