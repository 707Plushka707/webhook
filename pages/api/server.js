
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = socketIO(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

io.on('connection', (socket) => {
    console.log("user connect");
    socket.on("webhook",msg =>{
        io.emit("webhooktest", msg);
        console.log("성공이다 ", msg);
    });
    socket.on("hello", function(data){
        io.emit("kirim", data);
    });
});

server.listen(3001);