// Mosca MQTT broker
var mosca = require('mosca')
var settings = {port: 1234}
var broker = new mosca.Server(settings)
const pool = require('../src/config/db/database');

broker.on('ready', ()=>{
    console.log('Broker is ready!')
})

broker.on('published', (packet)=>{
    message = packet.payload.toString()
    client = packet.topic.toString();
    // console.log(client);
    // console.log(message);
    if(message.slice(0, 2) == '{ '){
        var space = message.split(' ').length - 1;//so luong dau cach
        var length = message.length; //so luong ky tu
        var temp; //vi tri dau cach
        var arr = []; //mang
        var cut;//chuoi trc dau cach
        for (let i = 0; i < space; i++) {
            temp = message.indexOf(' ');
            cut = message.substring(0, temp);
            if(cut != '{'){
            arr.push(cut);
            }
            message = message.slice(temp + 1, length);
        }
        pool
            .query(`select * from thietbi where idthietbi = $1`, [arr[0]])
            .then(result => {
                if(result.rows[0] == undefined){
                    pool
                        .query(`INSERT INTO public.thietbi(idthietbi, taikhoan, matkhau, iddonvi, idloai, tenthietbi, trangthai)
                        VALUES ($1, $2, $3, $4, $5, $6, $7);`, arr)
                        .then( result => {
                            console.log('Thêm thiết bị thành công');
                        })
                        .catch();
                }
            })
            .catch(() => {
                console.log('lỗi 2');
            })
    }
    if(message.slice(0, 2) != '{ ' && message.slice(0, 4) != 'mqtt' && message != '}'){
        date = new Date();
        day = date.getDay() + 1;
        month = date.getMonth() + 1;
        year = date.getFullYear();
        thoigiangui = month + '-' + day + '-' + year;
        // pool
        //     .query(`select * from thietbi where idthietbi = $1`, )
        //     .then(result => {
        //         if(result.rows[0] != undefined){
                    pool
                    .query(`INSERT INTO dulieu(idthietbi, thoigiangui, chitiet)
                        VALUES ($1, $2, $3);`, [client, thoigiangui, message]
                    )
                    .then(result => {
                        console.log(message);
                    })
                    .catch(err => {
                        // console.log('lỗi 3 ' + message);
                        console.log(err);
                    });
                // }
            // })
            // .catch(() => {

            // });
    }
});

// broker.on('subscribed', function(topic, client) {
//     if (topic == 'mqtt_0b83262e') {
//       client.close();
//     }
//     console.log('subscribed: ', topic);
// });

