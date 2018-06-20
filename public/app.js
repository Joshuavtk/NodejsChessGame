const socket = io();

function submit(piece, newFile, newRank) {
  let pieceInfo = [piece.color, piece.piece, piece.num, newFile, newRank];
  socket.emit('init', pieceInfo);
}

function checkForSession(sessionId) {
  socket.emit('check_session', sessionId)
}

function createSession() {
  socket.emit('create_session')
}

socket.on('session_created', (sessionId) => {
  chessboardController.showColorSelectionScreen(sessionId)
})

socket.on('session_exists', (data) => {
  if (data[0]) {
    chessboardController.showColorSelectionScreen(data[1])
  } else {
    console.log('No session was found with id ' + data[1])
  }
});

socket.on('response', (pieceInfo) => {
  chessboardModel[pieceInfo[0] + pieceInfo[1]][pieceInfo[2]].updatePosition(pieceInfo[3], pieceInfo[4]);
});
