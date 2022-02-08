const express =require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
const producto = require('./controller/api.js')
let listaProductos = new producto.ProductosApi()
console.log(listaProductos.listarAll())
const ejs = require ("ejs")
const {load} = require("nodemon/lib/rules");
app.set('view engine', ejs);



app.get('/productos',(req,res) =>{

    res.render('pages/form.ejs', {
        lista: listaProductos.listarAll()
    })
})

app.post('/productos',(req, res) => {
    console.log(req.body)
    let nuevoProducto = req.body
    nuevoProducto.title = req.body.title
    nuevoProducto.price = req.body.price
    nuevoProducto.thumbnail = req.body.thumbnail
    nuevoProducto.id = listaProductos.length + 1
    listaProductos.guardar(nuevoProducto)
    console.log()
    res.redirect('/productos')

})


app.listen(8080)