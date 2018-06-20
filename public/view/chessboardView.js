/*
    The view displays all methods and data.
*/
const chessboardView = {};

chessboardView.init = () => {
    const chessboard = document.createElement("div");
    let wrapper = document.getElementById("wrapper");
    chessboard.id = "chessboard";
    wrapper.appendChild(chessboard);
    chessboardView.chessboard = chessboard;

    //Showing horizontal rows
    let files = chessboardModel.files; // Horizontal rows
    let ranks = chessboardModel.ranks; // Vertical rows

    const playerColor = chessboardModel.player;
    const player = chessboardModel.player === 'white';

    if (!player) files.reverse(), ranks.reverse();

    for (let i = 0; i < files.length; i++) {
        let file = chessboardView.createFile(i, files);

        for (let rankIdentifier = 0; rankIdentifier < ranks.length; rankIdentifier++) {
            chessboardView.createRank(i, ranks, file, rankIdentifier);
        }

        chessboardView.createFileLabel(i, files);

        chessboardView.createRankLabel(i, ranks);
    }

    if (!player) files.reverse(), ranks.reverse();
};

chessboardView.createFile = (i, files) => {
    let file = document.createElement("div");
    file.id = "file_" + files[i];
    file.style.left = i * 100 + "px";
    file.style.top = "0px";
    file.style.height = "800px";
    file.style.width = "100px";
    document.getElementById("chessboard").appendChild(file);
    return file;
}

chessboardView.createRank = (i, ranks, file, rankIdentifier) => {
    let rank = document.createElement("div");
    rank.id = file.id + "-rank_" + ranks[rankIdentifier];
    rank.style.bottom = rankIdentifier * 100 + "px";
    rank.style.left = "0px";
    rank.style.height = "100px";
    rank.style.width = "100px";
    if (rankIdentifier % 2 === 0 && i % 2 === 0 ||
        rankIdentifier % 2 && i % 2) {
        rank.style.backgroundColor = "rgb(255, 164, 0)";
    } else {
        rank.style.backgroundColor = "rgb(255, 255, 170)";
    }
    rank.onclick = () => chessboardModel.selectPiece(rank.className, rank.id);

    file.appendChild(rank);
}

chessboardView.createFileLabel = (i, files) => {
    let fileLabel = document.createElement("div");
    fileLabel.className = "fileLabel";
    fileLabel.style.left = i * 100 + "px";
    fileLabel.style.width = "100px";
    fileLabel.style.top = "800px";
    fileLabel.innerHTML = files[i];
    chessboardView.chessboard.appendChild(fileLabel);
}

chessboardView.createRankLabel = (i, ranks) => {
    let rankLabel = document.createElement("div");
    rankLabel.className = "rankLabel";
    rankLabel.style.top = i * 100 + "px";
    rankLabel.style.left = "800px";
    rankLabel.innerHTML = ranks[7 - i];
    chessboardView.chessboard.appendChild(rankLabel);
}