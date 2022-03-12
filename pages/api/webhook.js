import {io} from 'socket.io-client'

const socket = io("https://nameless-ravine-30994.herokuapp.com:3001", {transports: ['websocket']});

export default async function (req, res) {
    if (req.method == 'POST') {
        res.status(200).json(req.body);
        socket.emit("webhook", req.body);
    }
    else{
        res.status(500).json({
            message:
              "Sorry, articles/username/articleId api only accepts GET or POST method",
          });
    };

}