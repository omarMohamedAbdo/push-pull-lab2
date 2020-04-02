const app = require('express')();
const cors = require('cors');
const socketio = require('socket.io')
const server = require('http').Server(app)

app.use(cors());

const io = socketio(server);

io.on('connection', (client) => {
    client.on('message', (message) => {
        console.log(message);
        //Send the Message to all clients
        io.emit('new-message',message);
    });
});

server.listen(4000,() => {
    console.info('server listning on port 4000');
});
