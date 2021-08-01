//MQTT sub
const mqtt = require('mqtt');
// const client = mqtt.connect('mqtt://localhost:1234');
// const topic = 'quangThangTest';
const user = {
    username: '1',
    password: '2'
}
const client = mqtt.connect('mqtt://localhost:1234', user);

client.on('message', (topic, message) => {
    message = message.toString();
    console.log(message);
});

client.on('connect', () => {
    client.subscribe(user.username);
});