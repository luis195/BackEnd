const express =require('express');
const app = express();
const handlebars = require("express-handlebars");
const {Router} = require("express");
let controller = require ("./controller/api")
let api = new controller.ProductosApi()
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
api.productos = listaProductos
const productos = Router()
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.engine("hbs",handlebars.engine({
        extname: ".hbs",
        defaultLayout: 'main.hbs',
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + '/views/partials'
    })
)

app.get('/', (req, res) =>{
    res.render('main',{layout:'index'})
})

app.post('/',(req, res) => {
    console.log(req.body)
    let nuevoProducto = req.body
    nuevoProducto.title = req.body.title
    nuevoProducto.price = req.body.price
    nuevoProducto.thumbnail = req.body.thumbnail
    nuevoProducto.id = listaProductos.length + 1
    listaProductos.push(nuevoProducto)
    res.render('main',{layout:'index'})
})


app.set("views","./views");
app.set('view engine', "hbs");

app.use(express.static("public"))
app.use('productos', productos)
app.listen(8080)

