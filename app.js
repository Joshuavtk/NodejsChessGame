var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var sockets = [];

var port = "3178";

app.use(express.static(__dirname + "/public"));

app.get("/chatbox",(req,res)=>{
  res.sendFile(__dirname + "/public/chatbox.html");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/startscreen.html");
});

app.get(["/player1", "/player2"], (req, res) => {
    res.sendFile(__dirname + "/public/chessgame.html");
});

server.listen(port, hijWerkt);

function hijWerkt() {
  console.log("Listening on port: " + port);
}

io.on('connection',(socket)=>{
  socket.sessionId = 'test';
  sockets.push(socket);
  console.log(sockets.sessionId);
  console.log('connection with ' + socket);
  socket.on('init',(data)=>{
      for (var i = 0; i < sockets.length; i++) {
        sockets[i].emit('response', data);
      }
  });
});