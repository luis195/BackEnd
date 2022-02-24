const express = require('express');
const {json} = require("express");
const fs = require("fs")
const {Router} = express
const app = express()
const productos = Router()
const carrito = Router()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

let objetos = require("./controller/api.js")
let listadoProductos = new objetos.ProductosApi()
let carritoIndividual = new objetos.Carrito()
let listadoCarritos = new objetos.TodosLosCarritos()

productos.get('/',(req, res) => {
    res.send('ok')
})

productos.get('/productos',(req, res) => {
    res.json(listadoProductos.listarAll())
})

productos.get('/productos/:id', async(req, res) => {
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

carrito.post('/carrito',(req,res) =>{
    let carrito = listadoCarritos.crearCarrito()
    res.send(`carrito creado con el id : ${carrito}` )
})
carrito.delete('/carrito/:id',(req,res) =>{

    let id = parseInt( req.params.id);
    listadoCarritos.borrarCarrito(id)
    res.json("Carrito eliminado")
})
carrito.get('/:id/productos',(req,res) =>{
    let id = parseInt( req.params.id);
    console.log(listadoCarritos.carritos[id].listarAll())
    res.json(listadoCarritos.carritos[id].listarAll())
})

carrito.delete('/:id/productos/:id_prod',(req,res) =>{

    const idCarrito = req.params.id
    const id_prod = req.params.id_prod
    listadoCarritos.borrarProductoCarrito(idCarrito,id_prod)
    res.send({Mensaje:" carrito eliminado"})
})
app.use('/static', express.static('public'))
app.use('/api', productos)
app.use('/api',carrito)
app.listen(8080)