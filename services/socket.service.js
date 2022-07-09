var gIo = null

function setupSocketAPI(http) {
    gIo = require('socket.io')(http)
    gIo.on('connection', socket => {
        socket.on('join-room', (roomId) => {
            socket.join(roomId)
            socket.room = roomId // BAD PRACTICE !
            console.log('JOINED ROOM '+roomId)
        })
        socket.on('store-candidate',(data)=>{
            gIo.to(socket.room).emit('got-candidate',data)
        })
        socket.on('store-offer',(data)=>{socket.to(socket.room).emit('got-offer',data)})
        socket.on('store-answer',(data)=>{socket.to(socket.room).emit('got-answer',data)})
        socket.on('disconnect', socket => {
        })
        socket.on('send-user-details',(data)=>{
            const {roomId,userId} = data
            console.log(data)
            gIo.to(roomId).emit('get-user-details',userId)
            // socket.to(roomId).emit('get-user-details',userId)
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