/*
    The model handels all data and changes to data.
*/

const chessboardModel = {};

chessboardModel.init = (playerColor) => {
    chessboardModel.files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // Horizontal rows
    chessboardModel.ranks = [1, 2, 3, 4, 5, 6, 7, 8]; // Vertical rows

    chessboardModel.blackPieces = {
        Rook: '♜',
        Knight: '♞',
        Bishop: '♝',
        Queen: '♛',
        King: '♚',
        Pawn: '♟'
    };
    chessboardModel.whitePieces = {
        Rook: '♖',
        Knight: '♘',
        Bishop: '♗',
        Queen: '♕',
        King: '♔',
        Pawn: '♙'
    };

    // Global Variables
    chessboardModel.selectedPiece = "";
    chessboardModel.selectedPlaceColor = "";
    chessboardModel.selectedPlace = "";
    chessboardModel.possiblePathPlace = [''];
    chessboardModel.possiblePathPlaceIds = [''];
    chessboardModel.possiblePathPlaceColor = [''];

    // Your side
    chessboardModel.player = playerColor;
    chessboardModel.yourTurn = (chessboardModel.player === 'white') ? true : false;
    document.getElementById("gameInfo").innerHTML += "You're playing as " + chessboardModel.player + '<br>';
};

chessboardModel.selectPiece = (pieceClassName, pieceNextPosition) => {
    if (chessboardModel.yourTurn) {
        // Variables used in function
        let pieceName = pieceClassName.split(" "); // piece name, num
        let currentPiece = "";
        if (pieceName[0]) {
            currentPiece = chessboardModel[pieceName[0]][pieceName[1]];
        }

        if (chessboardModel.selectedPiece === "") { // Not yet selected a piece
            if (pieceName[0]) {
                // Check if selected piece color is the same as your own
                if (currentPiece.color === chessboardModel.player) {
                    chessboardModel.selectedPiece = pieceName;
                    currentPiece.highlightPlace();
                    currentPiece.showPossiblePath();
                } else {
                    console.log('You tried to move the opponent\'s piece.');
                }
            } else {
                console.log('Select a piece first.');
            }
        } else { // Already selected a piece
            let movingPiece = chessboardModel[chessboardModel.selectedPiece[0]][chessboardModel.selectedPiece[1]];
            if (pieceName[0]) {
                if (currentPiece.color !== chessboardModel.player) {
                    // Moving a piece to a place where a enemy piece was.
                    chessboardModel.movePiece(pieceNextPosition, movingPiece);
                    movingPiece.resetBackgroundColor();
                } else {
                    // Moving to a place where a piece of your own color is.
                    movingPiece.resetBackgroundColor();
                    chessboardModel.possiblePathPlace = [''];
                    chessboardModel.selectedPiece = "";
                    console.log('That spot is already occupied by one of your own pieces.');
                }
            } else {
                // Moving a piece to an empty location.
                chessboardModel.movePiece(pieceNextPosition, movingPiece);
                movingPiece.resetBackgroundColor();
            }
        }
    } else {
        console.log('Wait for the opponent');
    }
};

chessboardModel.movePiece = (pieceNextPosition, movingPiece) => {

    pieceNextPosition = pieceNextPosition.split("-");
    pieceNextPosition[0] = pieceNextPosition[0].replace('file_', '');
    pieceNextPosition[1] = parseInt(pieceNextPosition[1].replace('rank_', ''));

    let possiblePos = chessboardModel.possiblePathPlace;
    for (let i = 1; i < possiblePos.length; i++) {
        if (pieceNextPosition[0] + pieceNextPosition[1] === possiblePos[i]) {
            chessboardModel.yourTurn = false;
            submit(movingPiece, pieceNextPosition[0], pieceNextPosition[1]);
            //movingPiece.updatePosition(pieceNextPosition[0], pieceNextPosition[1]);
            if (movingPiece.piece === 'Pawn' && movingPiece.moveSet.forward === 2) {
                movingPiece.moveSet.forward = 1;
            }
            break;
        }
    }
    chessboardModel.possiblePathPlace = [''];
    chessboardModel.selectedPiece = "";

};

chessboardModel.showPath = (possiblePositionElement, possiblePositionId, enemyPieceOnPath) => {
    // Save variables for reverting the color back
    let length = chessboardModel.possiblePathPlaceColor.length;
    chessboardModel.possiblePathPlaceColor[length] = possiblePositionElement.style.backgroundColor;
    chessboardModel.possiblePathPlaceIds[chessboardModel.possiblePathPlaceIds.length] = possiblePositionId;

    // Set highlighting color
    let color = "rgb(235, 130, 39)";
    if (enemyPieceOnPath) {
        color = "rgb(255, 52, 16)";
    } else if ("rgb(255, 164, 0)" === chessboardModel.possiblePathPlaceColor[length]) {
        color = "rgb(255, 104, 43)";
    }
    possiblePositionElement.style.backgroundColor = color;
};