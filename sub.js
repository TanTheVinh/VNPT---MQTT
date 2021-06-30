//MQTT sub
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://localhost:1234');
var topic = 'TheVinhTest';

client.on('message', (message) => {
    message = message.toString();
    console.log(message);
});

client.on('connect', () => {
    client.subscribe(topic);
});