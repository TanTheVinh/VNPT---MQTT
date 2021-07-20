const Pool = require('pg').Pool;

var pool = new Pool({
    host: 'localhost',
    database: 'mqtt',
    user: 'postgres',
<<<<<<< HEAD
    password: '7714119',
=======
    password: 'sa',
>>>>>>> 3c8d9a1b34b3d998865e8419ba5378b770052504
    port: 5432
});

module.exports = pool;
