const Pool = require('pg').Pool;

var pool = new Pool({
    host: 'localhost',
    database: 'mqtt',
    user: 'postgres',
<<<<<<< HEAD
    password: 'thevinh',
=======
    password: '7714119',
>>>>>>> 6f235172dc201c8d6c3f3c305e01cf5aef9db648
    port: 5432
});

module.exports = pool;
