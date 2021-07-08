//nhan duoc tu client -->
const users = {
    name: "tanthevinh",
    message: "Hello world!"
};
// <--

const json = '{"name":"tanthevinh","message":"Hello world!"}';

console.log(JSON.parse(json).name);