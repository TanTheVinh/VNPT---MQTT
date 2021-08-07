// Mosca MQTT broker
var mosca = require('mosca')
var settings = {port: 1234}
var broker = new mosca.Server(settings)
const pool = require('../src/config/db/database');

var user= {}

broker.on('ready', () =>{
    console.log('Broker is ready!');
    broker.authenticate = function (client, username, password, callback) {
        pool
            .query(`select * from thietbi where idthietbi = $1`, [client.id])
            .then(result => {
                user.username = result.rows[0].taikhoan;
                user.password = result.rows[0].matkhau;
            })
            .catch();
        callback(null, (username === user.username && password.toString('ascii') === user.password));
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

    //them thiet bi
    // if(message.slice(0, 2) == '( '){
    //     var space = message.split(' ').length - 1;//so luong dau cach
    //     var length = message.length; //so luong ky tu
    //     var temp; //vi tri dau cach
    //     var arr = []; //mang
    //     var cut;//chuoi trc dau cach
    //     for (let i = 0; i < space; i++) {
    //         temp = message.indexOf(' ');
    //         cut = message.substring(0, temp);
    //         if(cut != '('){
    //         arr.push(cut);
    //         }
    //         message = message.slice(temp + 1, length);
    //     }
    //     pool
    //         .query(`select * from thietbi where idthietbi = $1`, [arr[0]])
    //         .then(result => {
    //             if(result.rows[0] == undefined){
    //                 pool
    //                     .query(`INSERT INTO public.thietbi(idthietbi, taikhoan, matkhau, iddonvi, idloai, tenthietbi, trangthai)
    //                     VALUES ($1, $2, $3, $4, $5, $6, $7);`, arr)
    //                     .then( result => {
    //                         console.log('Thêm thiết bị thành công');
    //                     })
    //                     .catch();
    //             }
    //         })
    //         .catch(() => {
    //             console.log('lỗi 2');
    //         })
    // }
    // 
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

// broker.on('subscribed', function(topic, client) {
//     if (topic == 'mqtt_0b83262e') {
//       client.close();
//     }
//     console.log('subscribed: ', topic);
// });
