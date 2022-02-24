
require('dotenv').config();
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const app = express()
const server = http.createServer(app)

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log("MongoDB connected..."))
.catch((e) => console.log("MongoDB error...", e))

let db = mongoose.connection;

let student = mongoose.Schema({
    name: 'string',
    address : 'string',
    age : 'number'
});

let Student = mongoose.model('data', student);
let newStudent = new Student({name: 'Jang Seong Hun', address:'test', age : '22'});

newStudent.save((err, data) => {
    if(err){
        console.log("error");
    }else{
        console.log('save')
    }
});

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
        console.log("성공이다 ", msg);
    });
});

server.listen(3001);