//import {io} from 'socket.io-client'
require("dotenv").config();

const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: process.env.BINANCE_API_TESTNET,
  APISECRET: process.env.BINANCE_SECRET_TESTNET,
  test: true,
  base: "https://testnet.binance.vision/api" 
});

async function test() {
    const data = await binance.futuresAccount();
    const data1 = Object.keys(data);
    console.log(data.assets);
}

test();
    /*
const socket = io("http://localhost:3001", {transports: ['websocket']});


socket.on("tradeData", async data =>{
    //SHORT 매수 
    if(data.divergenceSellCircle && data.rsi >= -20){

    }
    if(data.divergenceBuyCircle && data.rsi <= -80){
        
    }
})*/
