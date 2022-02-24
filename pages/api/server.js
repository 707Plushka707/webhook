require("dotenv").config();
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const app = express()
const server = http.createServer(app)

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log("MongoDB connected..."))
.catch((e) => console.log("MongoDB error...", e))

const db = mongoose.connection;

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
        io.emit("tradeData", msg);
        db.collection("datas").insertOne(msg,(err, res) => {
            if(err) throw err;
            console.log("1 document inserted..");
        })
        console.log("성공이다 ", msg);
    });
});

server.listen(3001);