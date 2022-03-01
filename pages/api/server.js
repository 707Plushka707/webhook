require("dotenv").config();
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const app = express()
const server = http.createServer(app)

const mongoose = require('mongoose');

const io = socketIO(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

async function findDB() {
    const client = await mongoose.connect(process.env.MONGODB_URI)
    .catch((e) => console.log("MongoDB error...", e))
    const db = mongoose.connection;
    if(!client){
        console.log(client)
        return;
    }
    try{

        const find = await db.collection("datas").find().toArray();
        console.log("////////DB : ",find);
    } catch(err) {
        console.log(err);
    } finally {
        db.close();
    }
}

async function insertDB(data) {
    const client = await mongoose.connect(process.env.MONGODB_URI)
    .catch((e) => console.log("MongoDB error...", e))
    const db = mongoose.connection;
    if(!client){
        return;
    }
    try{

        await db.collection("datas").insertOne(data);
        console.log("1 document inserted....");
        }catch(err) {
            console.log(err);
        }finally {
            db.close();
        }
    
}


io.on('connection', (socket) => {
    console.log("user connect");
    socket.on("webhook",async msg =>{
      //  io.emit("webhooktest", );
        io.emit("tradeData", msg);
        await insertDB(msg);
       // console.log("성공이다 ", msg);
        await findDB();
    });
});

server.listen(3001);