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
      //  console.log("////////DB : ",find);
      return(find);
      
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
        await insertDB(msg);
        const dbData = await findDB();
        io.emit("webhooktest", dbData);
        io.emit("tradeData", msg);

    });
});

server.listen(3001);