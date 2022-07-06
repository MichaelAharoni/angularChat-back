const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const { setupSocketAPI } = require('./services/socket.service')
const path = require('path')
const http = require('http').createServer(app) /* surrounding http let us use WebSockets */

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000/', 'http://localhost:3000/','https://127.0.0.1:3000/', 'https://localhost:3000/'],
        credentials: true
    }
    app.use(bodyParser.json())
    app.use(cors({}))
}
setupSocketAPI(http)


http.listen(3030,()=>{console.log('Server is running on port 3030')})