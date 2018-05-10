/*
    Defining how the chess pieces should act.
*/

class chessPiece {
    constructor(num, color, piece, file, rank) {
        this.num = num;
        this.color = color;
        this.piece = piece;
        this.file = file;
        this.rank = rank;
        this.defineColor();
        this.spawnPiece(this.file, this.rank);
    }
    defineColor() {
        if (this.color === 'white') {
            this.appearance = chessboardModel.whitePieces[this.piece];
        } else {
            this.appearance = chessboardModel.blackPieces[this.piece];
        }
    }
    spawnPiece(newFile, newRank) {
        // Set position
        this.position = 'file_' + newFile + '-' + 'rank_' + newRank;
        this.place = document.getElementById(this.position);
        document.getElementById(this.position).className = this.color + this.piece + ' ' + this.num;
        this.place.innerHTML = this.appearance;

        // Update new position in the class
        this.file = newFile;
        this.rank = newRank;
    }
    currentPosition() {
        console.log(this.rank + this.file);
    }
    updatePosition(newFile, newRank) {
        // Clear old position
        document.getElementById('file_' + this.file + '-' + 'rank_' + this.rank).innerHTML = "";
        document.getElementById('file_' + this.file + '-' + 'rank_' + this.rank).className = "";

        // Updating position
        this.position = 'file_' + newFile + '-' + 'rank_' + newRank;
        this.place = document.getElementById(this.position);
        document.getElementById(this.position).className = this.color + this.piece + ' ' + this.num;
        this.place.innerHTML = this.appearance;

        // Changing whose turn it is
        if(this.color !== chessboardModel.player) {
            chessboardModel.yourTurn = true;
        }

        // Log the position change
        let logMessage = '<div class="log-message"><span class="log-piece">' + this.appearance + '</span>' + this.file + this.rank + ' → ' + newFile + newRank + '</div>';
        document.getElementById("gameInfo").innerHTML += (logMessage);

        // Scroll log down to bottom
        let sidebar = document.getElementById('sidebar');
        sidebar.scrollTop = sidebar.scrollHeight;

        // Update new position in the class
        this.file = newFile;
        this.rank = newRank;
    }
    highlightPlace() {
        // Save current background color and the color's position
        chessboardModel.selectedPlaceColor = document.getElementById(this.position).style.backgroundColor;
        chessboardModel.selectedPlace = this.position;

        // Give new background color
        document.getElementById(this.position).style.backgroundColor = "rgb(114, 111, 224)";
    }
    resetBackgroundColor() {
        // Revert background color of piece's position (its place)
        document.getElementById(chessboardModel.selectedPlace).style.backgroundColor = chessboardModel.selectedPlaceColor;

        // Revert background color of piece's path
        for (let i = 1; i < chessboardModel.possiblePathPlaceId.length; i++) {
            let backgroundResetElement = document.getElementById(chessboardModel.possiblePathPlaceId[i]);
            backgroundResetElement.style.backgroundColor = chessboardModel.possiblePathPlaceColor[i];
        }
    }
    showPossiblePath() {
        // Determining the file position

        let fileArrayPosition = "";
        for (let i = 0; i < chessboardModel.files.length; i++) {
            if (chessboardModel.files[i] === this.file) {
                fileArrayPosition = i;
                break;
            }
        }

        const checkIfPossible = (possibleFileNum, possibleRank) => {
            if (possibleFileNum <= 7 && possibleFileNum >= 0 && possibleRank >= 1 && possibleRank <= 8) {
                let possibleFile = chessboardModel.files[possibleFileNum];
                let possiblePositionId = 'file_' + possibleFile + '-rank_' + possibleRank;
                let possiblePositionElement = document.getElementById(possiblePositionId);
                if (possiblePositionElement.className === "") { // Path is empty
                    chessboardModel.possiblePathPlace[chessboardModel.possiblePathPlace.length] = possibleFile + possibleRank;
                    chessboardModel.showPath(possiblePositionElement, possiblePositionId);
                    return true;
                } else { // Piece is on path
                    let possiblePositionPiece = possiblePositionElement.className.split(" ");
                    possiblePositionPiece = chessboardModel[possiblePositionPiece[0]][possiblePositionPiece[1]];
                    if (possiblePositionPiece.color !== chessboardModel.player) { // Enemy piece is on path
                        chessboardModel.possiblePathPlace[chessboardModel.possiblePathPlace.length] = possibleFile + possibleRank;
                        chessboardModel.showPath(possiblePositionElement, possiblePositionId, true);
                        return false;
                    } else { // Allied piece on path
                        return false;
                    }
                }
            } else {
                return false;
            }
        }

        if (this.color === "white") {

            if (this.moveSet.forward) {
                if (this.piece === 'Pawn') {
                    for (let i = 1; i <= this.moveSet.forward; i++) {
                        let possibleRank = this.rank + i;
                        let possibleFileNum = fileArrayPosition;
                        if (possibleFileNum <= 7 && possibleFileNum >= 0 && possibleRank >= 1 && possibleRank <= 8) {
                            let possibleFile = chessboardModel.files[possibleFileNum];
                            let possiblePositionId = 'file_' + possibleFile + '-rank_' + possibleRank;
                            let possiblePositionElement = document.getElementById(possiblePositionId);
                            if (possiblePositionElement.className === "") { // Path is empty
                                chessboardModel.possiblePathPlace[chessboardModel.possiblePathPlace.length] = possibleFile + possibleRank;
                                chessboardModel.showPath(possiblePositionElement, possiblePositionId);
                            }
                        }
                    }
                    const pawnMovement = (possibleFileNum, possibleRank) => {
                        if (possibleFileNum <= 7 && possibleFileNum >= 0 && possibleRank >= 1 && possibleRank <= 8) {
                            let possibleFile = chessboardModel.files[possibleFileNum];
                            let possiblePositionId = 'file_' + possibleFile + '-rank_' + possibleRank;
                            let possiblePositionElement = document.getElementById(possiblePositionId);
                            if (possiblePositionElement.className === "") { // Path is empty
                            } else { // Piece is on path
                                let possiblePositionPiece = possiblePositionElement.className.split(" ");
                                possiblePositionPiece = chessboardModel[possiblePositionPiece[0]][possiblePositionPiece[1]];
                                if (possiblePositionPiece.color !== chessboardModel.player) { // Enemy piece is on path
                                    chessboardModel.possiblePathPlace[chessboardModel.possiblePathPlace.length] = possibleFile + possibleRank;
                                    chessboardModel.showPath(possiblePositionElement, possiblePositionId, true);
                                }
                            }
                        }
                    }
                    pawnMovement(fileArrayPosition + 1, this.rank + 1);
                    pawnMovement(fileArrayPosition - 1, this.rank + 1);
                } else {
                    for (let i = 1; i <= this.moveSet.forward; i++) {
                        if (!checkIfPossible(fileArrayPosition, this.rank + i)) {
                            break;
                        }
                    }
                }
            }

            if (this.moveSet.backward) {
                for (let i = 1; i <= this.moveSet.backward; i++) {
                    if (!checkIfPossible(fileArrayPosition, this.rank - i)) {
                        break;
                    }
                }
            }

            if (this.moveSet.left) {
                for (let i = 1; i <= this.moveSet.left; i++) {
                    if (!checkIfPossible(fileArrayPosition - i, this.rank)) {
                        break;
                    }
                }
            }

            if (this.moveSet.right) {
                for (let i = 1; i <= this.moveSet.right; i++) {
                    if (!checkIfPossible(fileArrayPosition + i, this.rank)) {
                        break;
                    }
                }
            }

            if (this.moveSet.forward_left) {
                for (let i = 1; i <= this.moveSet.forward_left; i++) {
                    if (!checkIfPossible(fileArrayPosition - i, this.rank + i)) {
                        break;
                    }
                }
            }

            if (this.moveSet.forward_right) {
                for (let i = 1; i <= this.moveSet.forward_right; i++) {
                    if (!checkIfPossible(fileArrayPosition + i, this.rank + i)) {
                        break;
                    }
                }
            }

            if (this.moveSet.backward_left) {
                for (let i = 1; i <= this.moveSet.backward_left; i++) {
                    if (!checkIfPossible(fileArrayPosition - i, this.rank - i)) {
                        break;
                    }
                }
            }

            if (this.moveSet.backward_right) {
                for (let i = 1; i <= this.moveSet.backward_right; i++) {
                    if (!checkIfPossible(fileArrayPosition + i, this.rank - i)) {
                        break;
                    }
                }
            }

            if (this.moveSet.knightMove) {
                // right + 1, up + 2
                checkIfPossible(fileArrayPosition + 1, this.rank + 2);
                // right + 2, up + 1
                checkIfPossible(fileArrayPosition + 2, this.rank + 1);
                // right + 1, down + 2
                checkIfPossible(fileArrayPosition + 1, this.rank - 2);
                // right + 2, down + 1
                checkIfPossible(fileArrayPosition + 2, this.rank - 1);
                // left + 1, up + 2
                checkIfPossible(fileArrayPosition - 1, this.rank + 2);
                // left + 2, up + 1
                checkIfPossible(fileArrayPosition - 2, this.rank + 1);
                // left + 1, down + 2
                checkIfPossible(fileArrayPosition - 1, this.rank - 2);
                // left + 2, down + 1
                checkIfPossible(fileArrayPosition - 2, this.rank - 1);
            }

        } else { // black side
            if (this.moveSet.forward) {
                if (this.piece === 'Pawn') {
                    for (let i = 1; i <= this.moveSet.forward; i++) {
                        let possibleRank = this.rank - i;
                        let possibleFileNum = fileArrayPosition;
                        if (possibleFileNum <= 7 && possibleFileNum >= 0 && possibleRank >= 1 && possibleRank <= 8) {
                            let possibleFile = chessboardModel.files[possibleFileNum];
                            let possiblePositionId = 'file_' + possibleFile + '-rank_' + possibleRank;
                            let possiblePositionElement = document.getElementById(possiblePositionId);
                            if (possiblePositionElement.className === "") { // Path is empty
                                chessboardModel.possiblePathPlace[chessboardModel.possiblePathPlace.length] = possibleFile + possibleRank;
                                chessboardModel.showPath(possiblePositionElement, possiblePositionId);
                            }
                        }
                    }
                    const pawnMovement = (possibleFileNum, possibleRank) => {
                        if (possibleFileNum <= 7 && possibleFileNum >= 0 && possibleRank >= 1 && possibleRank <= 8) {
                            let possibleFile = chessboardModel.files[possibleFileNum];
                            let possiblePositionId = 'file_' + possibleFile + '-rank_' + possibleRank;
                            let possiblePositionElement = document.getElementById(possiblePositionId);
                            if (possiblePositionElement.className === "") { // Path is empty
                            } else { // Piece is on path
                                let possiblePositionPiece = possiblePositionElement.className.split(" ");
                                possiblePositionPiece = chessboardModel[possiblePositionPiece[0]][possiblePositionPiece[1]];
                                if (possiblePositionPiece.color !== chessboardModel.player) { // Enemy piece is on path
                                    chessboardModel.possiblePathPlace[chessboardModel.possiblePathPlace.length] = possibleFile + possibleRank;
                                    chessboardModel.showPath(possiblePositionElement, possiblePositionId, true);
                                }
                            }
                        }
                    }
                    pawnMovement(fileArrayPosition - 1, this.rank - 1);
                    pawnMovement(fileArrayPosition + 1, this.rank - 1);
                } else {
                    for (let i = 1; i <= this.moveSet.forward; i++) {
                        if (!checkIfPossible(fileArrayPosition, this.rank - i)) {
                            break;
                        }
                    }
                }
            }

            if (this.moveSet.backward) {
                for (let i = 1; i <= this.moveSet.backward; i++) {
                    if (!checkIfPossible(fileArrayPosition, this.rank + i)) {
                        break;
                    }
                }
            }

            if (this.moveSet.left) {
                for (let i = 1; i <= this.moveSet.left; i++) {
                    if (!checkIfPossible(fileArrayPosition + i, this.rank)) {
                        break;
                    }
                }
            }

            if (this.moveSet.right) {
                for (let i = 1; i <= this.moveSet.right; i++) {
                    if (!checkIfPossible(fileArrayPosition - i, this.rank)) {
                        break;
                    }
                }
            }

            if (this.moveSet.forward_left) {
                for (let i = 1; i <= this.moveSet.forward_left; i++) {
                    if (!checkIfPossible(fileArrayPosition + i, this.rank - i)) {
                        break;
                    }
                }
            }

            if (this.moveSet.forward_right) {
                for (let i = 1; i <= this.moveSet.forward_right; i++) {
                    if (!checkIfPossible(fileArrayPosition - i, this.rank - i)) {
                        break;
                    }
                }
            }

            if (this.moveSet.backward_left) {
                for (let i = 1; i <= this.moveSet.backward_left; i++) {
                    if (!checkIfPossible(fileArrayPosition + i, this.rank + i)) {
                        break;
                    }
                }
            }

            if (this.moveSet.backward_right) {
                for (let i = 1; i <= this.moveSet.backward_right; i++) {
                    if (!checkIfPossible(fileArrayPosition - i, this.rank + i)) {
                        break;
                    }
                }
            }

            if (this.moveSet.knightMove) {
                // right + 1, up + 2
                checkIfPossible(fileArrayPosition + 1, this.rank + 2);
                // right + 2, up + 1
                checkIfPossible(fileArrayPosition + 2, this.rank + 1);
                // right + 1, down + 2
                checkIfPossible(fileArrayPosition + 1, this.rank - 2);
                // right + 2, down + 1
                checkIfPossible(fileArrayPosition + 2, this.rank - 1);
                // left + 1, up + 2
                checkIfPossible(fileArrayPosition - 1, this.rank + 2);
                // left + 2, up + 1
                checkIfPossible(fileArrayPosition - 2, this.rank + 1);
                // left + 1, down + 2
                checkIfPossible(fileArrayPosition - 1, this.rank - 2);
                // left + 2, down + 1
                checkIfPossible(fileArrayPosition - 2, this.rank - 1);
            }

        }
    } // end ShowPossiblePath()
}

/*  Creating all the subclasses  */
class Rook extends chessPiece {
    constructor(num, color, file, rank) {
        super(num, color, 'Rook', file, rank);
        this.moveSet = {
            forward: 8,
            right: 8,
            backward: 8,
            left: 8
        }
    }
}

class Knight extends chessPiece {
    constructor(num, color, file, rank) {
        super(num, color, 'Knight', file, rank);
        this.moveSet = {
            knightMove: 1
        }
    }
}

class Bishop extends chessPiece {
    constructor(num, color, file, rank) {
        super(num, color, 'Bishop', file, rank);
        this.moveSet = {
            forward_right: 8,
            forward_left: 8,
            backward_right: 8,
            backward_left: 8
        }
    }
}

class Queen extends chessPiece {
    constructor(num, color, file, rank) {
        super(num, color, 'Queen', file, rank);
        this.moveSet = {
            forward: 8,
            right: 8,
            backward: 8,
            left: 8,
            forward_right: 8,
            forward_left: 8,
            backward_right: 8,
            backward_left: 8
        }
    }
}

class King extends chessPiece {
    constructor(num, color, file, rank) {
        super(num, color, 'King', file, rank);
        this.moveSet = {
            forward: 1,
            right: 1,
            backward: 1,
            left: 1,
            forward_right: 1,
            forward_left: 1,
            backward_right: 1,
            backward_left: 1
        }
    }
}

class Pawn extends chessPiece {
    constructor(num, color, file, rank) {
        super(num, color, 'Pawn', file, rank);
        this.moveSet = {
            forward: 2
        }
    }
}