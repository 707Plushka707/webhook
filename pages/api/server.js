
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
let testData = {name: 'sdasd', age: '22', address: 'sdjidjsjidsji'};
db.collection("datas").insertOne(testData,(err, res) => {
    if(err) throw err;
    console.log("1 document inserted..");
})

/*
let student = mongoose.Schema({
    name: 'string',
    address : 'string',
    age : 'number'
});

let alertData = mongoose.model('data', student);
let newalertData = new alertData();

newStudent.save((err, data) => {
    if(err){
        console.log("error");
    }else{
        console.log('save')
    }
});
*/
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