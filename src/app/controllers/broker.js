//MQTT broker
const mosca = require('mosca');
const { Pool, Client } = require('pg');
const settings = {port: 1234};
const broker = new mosca.Server(settings);
const pool = require('../../config/db/database');

pool.connect(() => {
    console.log('connected');
});

broker.on('ready', () => {
    console.log('Broker is ready!');
});

broker.on('published', (packet) => {
    message = packet.payload.toString();
    console.log(message);
    var id = Math.floor(Math.random() * 100);
    var day = new Date().getDate();
    var month = new Date().getMonth()+1;
    var year = new Date().getFullYear();
    var date = `${year}-${month}-${day}`;
    var arr = [date, message];
    if(message.slice(0, 1) != '{' && message.slice(0, 4) != 'mqtt'){
        var dbInsert = `INSERT INTO public.dulieu(
            idthietbi, thoigiangui, chitiet)
            VALUES (1, $1, $2);`
        pool
            .query(dbInsert, arr, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              console.log(res.rows[0]);
            }
          });
    }
});
