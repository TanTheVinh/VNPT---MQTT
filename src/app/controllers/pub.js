const { MqttClient } = require('mqtt');
const mqtt = require('mqtt');
// const client = mqtt.connect('mqtt://localhost:1234');

//bien tam -->
// const topic = 'theVinhTest';
const message = 'Hello world!';
const user = {
    username: '1', 
    password: '2'
}
const client = mqtt.connect('mqtt://localhost:1234', user);
// <--

client.on('connect', () => {
    setInterval(() => {
        // mqtt.client()
        client.publish(user.username, message);
        
        console.log('Message sent: ', message);
    }, 5000);
});