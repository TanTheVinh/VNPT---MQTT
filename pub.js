var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://localhost:1234');
var topic = 'TheVinhTest';
var message = 'Hello world!';

client.on('connect', () => {
    setInterval(() => {
        client.publish(topic, message);
        console.log('Message send: ', message);
    }, 500);
});