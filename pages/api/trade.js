require("dotenv").config();
const io = require('socket.io-client');
const socket = io("http://localhost:3001", {transports: ['websocket']});



const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: process.env.BINANCE_API_TESTNET,
  APISECRET: process.env.BINANCE_SECRET_TESTNET,
  test: true,
  base: "https://testnet.binance.vision/api" 
});

async function futuresAccount() {
    const data = await binance.futuresAccount();
    const data1 = data.positions;
    console.log(data1[23]);
    return
}
async function coinAmount(){
    const balance = await binance.futuresBalance();
    const markPrice = await binance.futuresMarkPrice( "ETHUSDT" );
    const data1 = balance[1].crossWalletBalance / markPrice.markPrice;
    return(data1.toFixed(3)-0.001);
}

async function futuresMarketBuy(){
    const amount = await coinAmount()
    binance.futuresMarketBuy('ETHUSDT',amount);// 갯수
   
   //console.log(data);

    console.log("구매완료");
}
async function futuresMarketSell(){
    const amount = await coinAmount()
    binance.futuresMarketSell('ETHUSDT',amount);// 갯수
}

futuresAccount();
//futuresMarketBuy(account);



socket.on("tradeData", async data =>{
    const account = await futuresAccount()
    console.log(account);
    /*
    if(account.positionAmt > 0){
        if(data.divergenceSellCircle && data.rsi >= -20){
            await futuresMarketSell();
            await futuresMarketSell();
        }
        if(data.divergenceBuyCircle && data.rsi <= -80){
            await futuresMarketBuy();
            await futuresMarketBuy();
        }
    }
    if(account.positionAmt == 0){
        if(data.divergenceSellCircle && data.rsi >= -20){
            futuresMarketSell();
        }
        if(data.divergenceBuyCircle && data.rsi <= -80){
            futuresMarketBuy();
        }
    }
    */

})

