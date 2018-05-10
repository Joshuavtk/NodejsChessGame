const socket = io();
const log = document.getElementById('gameInfo');

function submit(piece, newFile, newRank) {
  let pieceInfo = [piece.color, piece.piece, piece.num, newFile, newRank];
  socket.emit('init', pieceInfo);
}

socket.on('response', (pieceInfo) => {
  chessboardModel[pieceInfo[0] + pieceInfo[1]][pieceInfo[2]].updatePosition(pieceInfo[3], pieceInfo[4]);
});

socket.on('test', (data) => {
  console.log(data);
});
