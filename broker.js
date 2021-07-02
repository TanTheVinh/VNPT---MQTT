//MQTT broker
var aedes = require('aedes');
var settings = {port: 1883};
// var broker = new mosca.Server(settings);
var broker = new aedes.Server(settings);

broker.on('ready', () => {
    console.log('Broker is ready!');
});