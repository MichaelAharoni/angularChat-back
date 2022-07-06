var gIo = null

function setupSocketAPI(http) {
    gIo = require('socket.io')(http)
    gIo.on('connection', socket => {
        socket.on('join-room', (roomId) => {
            socket.join(roomId)
            console.log('JOINED ROOM '+roomId)
        })
        socket.on('check-socket', (str) => {
            socket.emit('check-socket', str)
        })
        socket.on('disconnect', socket => {
        })
    })
}

function emitTo({ type, data, label }) {
    if (label) gIo.to('watching:' + label).emit(type, data)
    else gIo.emit(type, data)
}

module.exports = {
    setupSocketAPI,
    emitTo
}