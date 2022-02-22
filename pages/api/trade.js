import {io} from 'socket.io-client'

const socket = io("http://localhost:3001", {transports: ['websocket']});

const line = [4779, 4460, 3900, 3300, 3178, 2900, 2600, 2325, 2170, 1971, 1720];
socket.on("tradeData", data =>{
    if(data.wtWave2 > 0){
        //숏
        let lineTop1 = 0;
        let lineTop2 = 0;
        let lineBottom = 0;
        for(let i = 0;i < line.length(); i++){
            if(data.Price - line[i] < 0){
                lineTop1 = line[i-1];
                lineBottom = line[i];
                break;
            }
        }
        lineTop2 = lineTop1 - (lineTop1 * 0.015);
        if(lineTop1 >= data.Price >= lineTop2){
            //숏 진입
        }
    }
    if(data.wtwave < 0){
        //롱
        let lineTop1 = 0;
        let lineBottom1 = 0;
        let lineBottom2 = 0;
        for(let i = 0;i < line.length(); i++){
            if(data.Price - line[i] < 0){
                lineTop1 = line[i-1];
                lineBottom = line[i];
                break;
            }
        }
        lineBottom2 = lineBottom1 + (lineBottom1 * 0.015);
        if(lineBottom1 <= data.Price <= lineBottom2){
            //롱 진입
        }
    }
})

