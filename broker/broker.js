// Mosca MQTT broker
var mosca = require('mosca')
var settings = {port: 1234}
var broker = new mosca.Server(settings)
const pool = require('../src/config/db/database');

broker.on('ready', () =>{
    console.log('Broker is ready!');
    broker.authenticate = function (client, username, password, callback) {
        const user = {};
        pool
            .query(`select * from thietbi where idthietbi = $1`, [client.id])
            .then(result => {
                user.username = result.rows[0].taikhoan;
                user.password = result.rows[0].matkhau;
            })
            .catch();
        callback(null, (username === user.username && password === user.password));
    }
})

broker.on('published', (packet, client)=>{
    message = packet.payload.toString();
    topic = packet.topic.toString();
    var clientid;
    // clientid = client.id.toString();
    // console.log(message);
    if(topic.slice(0, 1) != '$'){
        clientid = client.id;
        // console.log(client);
    }
    
    if(message.slice(0, 2) != '{ ' && message.slice(0, 4) != 'mqtt' && clientid != undefined){
        date = new Date();
        day = date.getDay() + 1;
        month = date.getMonth() + 1;
        year = date.getFullYear();
        hour = date.getHours();
        minute = date.getMinutes();
        second = date.getSeconds();
        thoigiangui = `${month}-${day}-${year} ${hour}:${minute}:${second}`;
        pool
            .query(`select * from thietbi where idthietbi = $1 and trangthai = true`, [clientid])
            .then(result => {
                if(result.rows[0] != undefined){
                    pool
                    .query(`INSERT INTO dulieu(idthietbi, thoigiangui, chitiet)
                        VALUES ($1, $2, $3);`, [clientid, thoigiangui, message]
                    )
                    .then(result => {
                        console.log(message);
                    })
                    .catch(err => {
                        // console.log('lỗi 3 ' + message);
                        console.log(err);
                    });
                }
            })
            .catch(() => {

            });
    }
});