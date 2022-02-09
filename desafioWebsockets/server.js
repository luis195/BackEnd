const express = require ('express')
const {Server: HttpServer} = require ('http')
const {Server: IOServer} = require ('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use (express.static('./public'))
app.get('/', (req, res) =>{
    res.sendFile('index.html', {root: __dirname})
})

httpServer.listen(3000, ()=>{
    console.log('Server on port 3000')
})

io.on('connection',(socket) =>{
    console.log('nuevo usuario conectado')
    socket.emit('mensajes', mensajes)
    socket.on('mensaje', data =>{
        mensajes.push({socketid: socket.id, mensaje: data})
        io.sockets.emit('mensajes', mensajes)

    })

    socket.emit('mi mensaje','hola estas conectado a nuestro server')
})

