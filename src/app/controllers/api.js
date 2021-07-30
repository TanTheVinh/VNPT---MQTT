// const client = mqtt.connect('ws://localhost:3000', {username:'1',password:'2'});
// const client = mqtt.connect('tcp://localhost:1883', { username: '1', password: '2' });

var settings = {
port: 1883,
http: {
port: 3000,
bundle: true,
static: './'
}
//backend: ascoltatore
};

server.on('ready', function () {
    console.log('Mosca server is up and running');
    server.authenticate = function (client, username, password, callback) {
        callback(null, (username === '1' && password.toString('ascii') === '2'));
    };
});