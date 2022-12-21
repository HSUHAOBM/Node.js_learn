const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3310


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const orderNamespace = io.of("/orders");


orderNamespace.on("connection", (socket) => {
  console.log('a user connected');
  socket.join("room1");
chat_space
  socket.on('chat message', (msg) => {
    console.log('/orders/message: ' + msg);

    orderNamespace.to("room1").emit('chat message' , msg);
  });


});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message' , msg);
  });
});





server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});