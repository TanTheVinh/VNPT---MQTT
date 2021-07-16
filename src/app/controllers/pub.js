const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1234');
//bien tam -->
const topic = 'theVinhTest';
const message = 'Hello world!';
// <--

client.on('connect', () => {
    setInterval(() => {
        client.publish(topic, message);
        console.log('Message sent: ', message);
    }, 5000);
});