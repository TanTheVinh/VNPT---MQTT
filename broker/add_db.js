var mosca = require('mosca')

var settings = {port: 1234}
var broker = new mosca.Server(settings)
const pool = require('../src/config/db/database');

broker.on('ready', () =>{
    console.log('Broker is ready!');
})

broker.on('published', (packet, client)=>{
    message = packet.payload.toString();
    topic = packet.topic.toString();
 //   console.log('mess'+ message);
    //console.log(arr);
    //console.log('topic'+ topic);
    if(message.slice(0, 2) == '{ ' ){
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
                        .query(`INSERT INTO public.thietbi(idthietbi, taikhoan, matkhau, iddonvi, idloai, tenthietbi, trangthai)
                        VALUES ($1, $2, $3, $4, $5, $6, $7);`, arr)
                        .then( result => {
                            console.log('Thêm thiết bị thành công');
                        })
                        .catch();
              
    }
    
    if(message.slice(0, 2) != '{ ' && message.slice(0, 5) != 'mqtt' && message != '}' && topic.slice(0,1) !='$'){
      //  console.log(topic)
        date = new Date();
        day = date.getDay() + 1;
        month = date.getMonth() + 1 ;
        year = date.getFullYear();
        hour = date.getHours();
        minute = date.getMinutes();
        second = date.getSeconds();
        thoigiangui = `${month}-${day}-${year} ${hour}:${minute}:${second}`;
                    pool
                    .query(`INSERT INTO dulieu(idthietbi, thoigiangui, chitiet)
                        VALUES ($1, $2, $3);`, [topic, thoigiangui, message]
                    )
                    .then(result => {
                        console.log(message);
                    })
                    .catch(err => {
                        console.log(err);
                    });
               
            
            
   }

});
