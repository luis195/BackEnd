const express =require('express');
const app = express();
const handlebars = require("express-handlebars");
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

app.engine("hbs",handlebars.engine({
        extname: ".hbs",
        defaultLayout: 'index.hbs'
    })
)
app.set("views","./public");
app.get('/', (req,res) => {
    res.render('datos.hbs',{
        listaProductos: listaProductos
    })
})
app.use(express.static("public"))
app.listen(8080)

