const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
// let sockets = [];
let gameSessions = [];

const port = "3178";

app.use(express.static(__dirname + "/public"));

// app.get("/chatbox", (req, res) => {
//   res.sendFile(__dirname + "/public/chatbox.html");
// });

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/public/startscreen.html");
// });

app.get(["/"], (req, res) => {
  res.sendFile(__dirname + "/public/chessgame.html");
});

server.listen(port, itWorks)

function itWorks() {
  console.log("Listening on port: " + port);
}

function addToSession(socket, sessionId) {
  // console.log(socket.id + ' joined game session ' + sessionId)
  socket.sessionId = sessionId
  if (!gameSessions['socket:' + sessionId]) {
    gameSessions['socket:' + sessionId] = []
  }
  gameSessions['socket:' + sessionId].push(socket)
}

io.on('connection', (socket) => {
  // sockets.push(socket)
  // console.log('Connected with ' + socket.id)
  // socket.emit('session_id', socket.sessionId)

  socket.on('init', (data) => {
    // console.log(data)
    // console.log(socket.sessionId)
    let sessionId = 'socket:' + socket.sessionId
    for (let i = 0; i < gameSessions[sessionId].length; i++) {
      gameSessions[sessionId][i].emit('response', data)
    }
  })

  socket.on('check_session', (sessionId) => {
    if (gameSessions['socket:' + sessionId]) {
      addToSession(socket, sessionId)
      socket.emit('session_exists', [true, sessionId])
    } else {
      socket.emit('session_exists', [false, sessionId])
    }
  })

  socket.on('create_session', () => {
    let sessionId = Math.floor((Math.random() * 8999) + 1000)
    addToSession(socket, sessionId)
    socket.emit('session_created', sessionId)
  })
});