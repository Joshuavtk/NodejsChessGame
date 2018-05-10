/* 
    This is the controller. It makes everyone do their jobs.
*/


const chessboardController = {};

chessboardController.init = () => {
    console.log(document.getElementById('sessionId').value);
    document.getElementById('wrapper').innerHTML = "";
    document.getElementById('gameInfo').innerHTML = "";
    chessboardModel.init((window.location.pathname === '/player1') ? 'white' : 'black');
    chessboardView.init();
    chesspieceView.init();
};

//addEventListener("load", chessboardController.init);