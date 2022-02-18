const express = require('express');
const {json} = require("express");
const {Router} = express
const app = express()
const productos = Router()
const carrito = Router()
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
let listado = require("./controller/api.js")
let carritos = require("./controller/api.js")
let listadoProductos = new listado.ProductosApi()
let totalCarritos = new carritos.ProductosApi()
listadoProductos.productos = listaProductos

productos.get('/',(req, res) => {
    res.send('ok')
})

productos.get('/productos',(req, res) => {
    console.log(listaProductos)
    res.json(listadoProductos.listarAll())
})

productos.get('/productos/:id',(req, res) => {
    console.log(req.params.id)
    let id = parseInt( req.params.id);
    res.json(listadoProductos.listar(id))
})

productos.post('/productos',(req, res) => {
    console.log(req.body)
    let nuevoProducto = req.body
    res.json(listadoProductos.guardar(nuevoProducto))
})

productos.put('/productos/:id',(req, res) => {
    let id = parseInt( req.params.id);
    let actualizaciones = req.body;
    res.json(listadoProductos.actualizar(actualizaciones,id))
})

productos.delete('/productos/:id',(req, res) => {
    let id = parseInt( req.params.id);
    res.json(listadoProductos.borrar(id))
})

carrito.post('/',(req,res) =>{

    let nuevoCarrito = req.body
    totalCarritos.guardar(nuevoCarrito)
    res.json(totalCarritos.productos.length)
})
carrito.delete('/:id',(req,res) =>{

    let id = parseInt( req.params.id);
    res.json(totalCarritos.borrar(id))
})
carrito.get('/:id',(req,res) =>{
    let id = parseInt( req.params.id);
    res.json(totalCarritos.listar(id))
})
// carrito.post('/:id/productos',(req,res) =>{
//
//     let nuevoCarrito = req.body
//     totalCarritos.guardar(nuevoCarrito)
//     res.json(totalCarritos.productos.length)
// })
// carrito.delete
app.use('/static', express.static('public'))
app.use('/api', productos)
app.use('/api',carrito)
app.listen(8080)