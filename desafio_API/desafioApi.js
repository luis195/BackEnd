const express = require('express');
const {json} = require("express");
const {Router} = express
const app = express()
const productos = Router()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

let listaProductos = [
    {
        "title": "lapiz",
        "price": 13,
        "thumbnail": "http link",
        "id": 1
    },
    {
        "title": "regla",
        "price": 10,
        "thumbnail": "http link",
        "id": 2
    },
    {
        "title": "cuaderno",
        "price": 40,
        "thumbnail": "http link",
        "id": 3
    },
    {
        "title": "auriculares",
        "price": 20,
        "thumbnail": "http link",
        "id": 4
    },
    {
        "title": "resma de papel",
        "price": 77,
        "thumbnail": "http link",
        "id": 5
    }
]

productos.get('/',(req, res) => {
    res.send('ok')
})


productos.get('/productos',(req, res) => {
    res.json(listaProductos)
})

productos.get('/productos/:id',(req, res) => {
    console.log(req.params.id)
    let id = parseInt( req.params.id);
    let producto = listaProductos.find(function (productos){
        return productos.id === id;
    })
    console.log(producto)
    if ( producto === undefined){
        producto = 'No se pudo encontrar el producto'
    }
    res.json(producto)
})

productos.post('/productos',(req, res) => {
    console.log(req.body)
    let nuevoProducto = req.body
    nuevoProducto.title = req.body.title
    nuevoProducto.price = req.body.price
    nuevoProducto.thumbnail = req.body.thumbnail
    nuevoProducto.id = listaProductos.length + 1
    listaProductos.push(nuevoProducto)
    res.json(listaProductos)
})

productos.put('/productos/:id',(req, res) => {
    let id = parseInt( req.params.id);
    let actualizaciones = req.body;
    for (let producto of listaProductos){
        if (producto.id === id){
            if( actualizaciones.hasOwnProperty('title')){
                producto.title = actualizaciones.title
            }
            if (actualizaciones.hasOwnProperty('price')){
                producto.price = actualizaciones.price
            }
            if (actualizaciones.hasOwnProperty('thumbnail')) {
                producto.thumbnail = actualizaciones.thumbnail
            }
        }
        else {
            listaProductos = 'Error'
        }
    }
    res.json(listaProductos)
    })


productos.delete('/productos/:id',(req, res) => {
    let id = parseInt( req.params.id);
    let respuesta = 'Producto no existe'
    for (let producto of listaProductos) {
        let i = 0
        if (producto.id === id){
            listaProductos.splice(i,1)
            respuesta = listaProductos
        }
        else {

        }
        i++
    }
    res.json(respuesta)
})

app.use('/static', express.static('public'))
app.use('/api', productos)
app.listen(8080)