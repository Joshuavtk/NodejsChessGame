/* 
    This is the controller. It makes everyone do their jobs.
*/

const chessboardController = {}

chessboardController.findPartner = () => {
    let sessionId = document.getElementById('sessionId').value
    console.log(sessionId)
    checkForSession(sessionId)
}

chessboardController.hostGame = () => {
    createSession()
}

chessboardController.showColorSelectionScreen = (sessionId) => {
    let wrapper = document.querySelector('#wrapper')
    wrapper.innerHTML = '<p>Invite a friend with session id: ' + sessionId + '</p>'
    wrapper.innerHTML += '<button onclick="chessboardController.init(\'white\')">Speel als wit</button>'
    wrapper.innerHTML += '<button onclick="chessboardController.init(\'black\')">Speel als zwart</button>'
}

chessboardController.init = (color) => {

    document.getElementById('wrapper').innerHTML = ""
    document.getElementById('gameInfo').innerHTML = ""
    chessboardModel.init(color)
    chessboardView.init()
    chesspieceView.init()
}