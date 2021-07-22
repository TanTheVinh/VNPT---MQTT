const Pool = require('pg').Pool;

var pool = new Pool({
    host: 'localhost',
    database: 'mqtt',
    user: 'postgres',
<<<<<<< HEAD
    password: 'sa',
=======
    password: '7714119',
>>>>>>> 53c105b2245310acdb16f0904273984ca92bf754
    port: 5432
});

module.exports = pool;
