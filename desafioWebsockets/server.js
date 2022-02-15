const express = require ('express')
const {Server: HttpServer} = require ('http')
const {Server: IOServer} = require ('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const mensajes = []

app.use (express.static('./public'))
    io.on('connection',(socket) => {
        console.log('nuevo usuario conectado')

        socket.emit('mensajes', mensajes)

        socket.on('new-message', data => {
            mensajes.push(data)
            io.sockets.emit('mensajes', mensajes)

        })
    })


const PORT = 8080
const connectedServer = httpServer.listen(PORT, function (){
    console.log(`servidor HTTP con websockets escuchando en el puerto ${connectedServer.address().port}`)
})

connectedServer.on('error', error => console.log(`error en el servidor ${error}`))

