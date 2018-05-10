/*
    Create all the chesspieces and places them on the board.
*/

const chesspieceView = {};

chesspieceView.init = () => {
    //Create white Rooks
    chessboardModel.whiteRook = [];
    chessboardModel.whiteRook[0] = new Rook(0, 'white', 'A', 1);
    chessboardModel.whiteRook[1] = new Rook(1, 'white', 'H', 1);
    //Create black Rooks
    chessboardModel.blackRook = [];
    chessboardModel.blackRook[0] = new Rook(0, 'black', 'A', 8);
    chessboardModel.blackRook[1] = new Rook(1, 'black', 'H', 8);

    //Create white Knights
    chessboardModel.whiteKnight = [];
    chessboardModel.whiteKnight[0] = new Knight(0, 'white', 'B', 1);
    chessboardModel.whiteKnight[1] = new Knight(1, 'white', 'G', 1);
    //Create black Knights
    chessboardModel.blackKnight = [];
    chessboardModel.blackKnight[0] = new Knight(0, 'black', 'B', 8);
    chessboardModel.blackKnight[1] = new Knight(1, 'black', 'G', 8);

    //Create white bishops
    chessboardModel.whiteBishop = [];
    chessboardModel.whiteBishop[0] = new Bishop(0, 'white', 'C', 1);
    chessboardModel.whiteBishop[1] = new Bishop(1, 'white', 'F', 1);
    //Create black bishops
    chessboardModel.blackBishop = [];
    chessboardModel.blackBishop[0] = new Bishop(0, 'black', 'C', 8);
    chessboardModel.blackBishop[1] = new Bishop(1, 'black', 'F', 8);

    //Create white queen
    chessboardModel.whiteQueen = [];
    chessboardModel.whiteQueen[0] = new Queen(0, 'white', 'D', 1);
    //Create black queen
    chessboardModel.blackQueen = [];
    chessboardModel.blackQueen[0] = new Queen(0, 'black', 'D', 8);

    //Create white king
    chessboardModel.whiteKing = [];
    chessboardModel.whiteKing[0] = new King(0, 'white', 'E', 1);
    //Create black king
    chessboardModel.blackKing = [];
    chessboardModel.blackKing[0] = new King(0, 'black', 'E', 8);

    //Create white pawns
    chessboardModel.whitePawn = [];
    for (let i = 0; i < 8; i++) {
        chessboardModel.whitePawn[i] = new Pawn(i, 'white', chessboardModel.files[i], 2);
    }
    //Create black pawns
    chessboardModel.blackPawn = [];
    for (let i = 0; i < 8; i++) {
        chessboardModel.blackPawn[i] = new Pawn(i, 'black', chessboardModel.files[i], 7);
    }
};