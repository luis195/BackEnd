const express =require('express');
const app = express();
const handlebars = require("express-handlebars");
app.use(express.json())
app.use(express.urlencoded({extended: true}))
let listaProductos = [
    {
        "title": "lapiz",
        "price": 13,
        "thumbnail": "https://cdn1.iconfinder.com/data/icons/material-design-icons-light/24/pencil-256.png",
        "id": 1
    },
    {
        "title": "regla",
        "price": 10,
        "thumbnail": "https://cdn0.iconfinder.com/data/icons/fitness-95/24/height-measurement-256.png",
        "id": 2
    },
    {
        "title": "cuaderno",
        "price": 40,
        "thumbnail": "https://cdn1.iconfinder.com/data/icons/office-322/24/notebook-book-notepad-spiral-128.png",
        "id": 3
    },
    {
        "title": "auriculares",
        "price": 20,
        "thumbnail": "https://cdn2.iconfinder.com/data/icons/lightly-icons/30/headphones-480.png",
        "id": 4
    },
    {
        "title": "resma de papel",
        "price": 77,
        "thumbnail": "https://cdn1.iconfinder.com/data/icons/document-edit-line/64/Document-doc-file-paper-report-bundle-sheaf-512.png",
        "id": 5
    }
]
let listado = require("./controller/api.js")
let listadoProductos = new listado.ProductosApi()
listadoProductos.productos = listaProductos

app.engine("hbs",handlebars.engine({
        extname: ".hbs",
        defaultLayout: 'index.hbs'
    })
)
app.set("views","./handlebars/public");
app.get('/dyn', (req,res) => {
    res.render('datos.hbs',{
        listaProductos: listadoProductos.listarAll()
    })
})
app.post('/productos',(req, res) => {
    console.log(req.body)
    let nuevoProducto = req.body
    nuevoProducto.title = req.body.title
    nuevoProducto.price = req.body.price
    nuevoProducto.thumbnail = req.body.thumbnail
    nuevoProducto.id = listaProductos.length + 1
    listaProductos.push(nuevoProducto)
    res.redirect('/productos')

})

app.listen(8080)

