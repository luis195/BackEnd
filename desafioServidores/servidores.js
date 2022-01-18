const http = require('http')
const express = require('express');
let app = express()
const PORT = 8080
const fs = require('fs')
class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }
    save(producto){
        fs.promises.readFile('productos.txt', 'utf8')
            .then(contenido => {

                let objetoEditable = JSON.parse(contenido)
                producto.id = objetoEditable.length === 0 ? 1 : objetoEditable[objetoEditable.length-1].id + 1;
                objetoEditable.push(producto)
                let objetoAlmacenar = JSON.stringify(objetoEditable, null, "\t")

                fs.promises.writeFile('productos.txt', objetoAlmacenar)
                    .then((p) => {
                        console.log('Objeto guardado y su ID es: ', producto.id)
                    })
                    .catch(() => {
                        console.log('error de guaraddo')
                    })
            })
            .catch(err => {
                console.log('error de lectura', err)
            })

    }
    getById(identificacion){
        fs.promises.readFile('productos.txt','utf-8')
            .then(contenido => {
                let objetoEditable = JSON.parse(contenido)
                let elemento = objetoEditable.findIndex(ind => ind.id === identificacion)
                if (elemento !== -1){
                    console.log(objetoEditable[elemento])
                }
                else {
                    console.log(null)
                }

            })
            .catch(err => {
                console.log('error de lectura', err)
            })
    }
    getAll(){
        fs.promises.readFile('productos.txt','utf-8')
                .then(contenido => {
                    let objetoEditable = JSON.parse(contenido)
                    console.log(objetoEditable)

                })
                .catch(err => {
                    console.log('error de lectura', err)
                })
        let b = fs.promises.readFile('productos.txt','utf-8')
            .then(contenido => {
                let objetoEditable = JSON.parse(contenido)
                console.log(objetoEditable)
                return objetoEditable
            })
        return b
    }
    deleteAll(){
        fs.promises.writeFile('productos.txt', '[]')
            .then((p) => {
                console.log('Objeto guardado ')
            })
            .catch(() => {
                console.log('error de guaraddo')
            })
    }
    deleteById(identificacion){

        fs.promises.readFile('productos.txt','utf-8')
            .then(contenido => {
                let objetoEditable = JSON.parse(contenido)

                let objetoEliminar = objetoEditable.findIndex(ind => ind.id === identificacion)
                if (objetoEliminar !== -1){
                    objetoEditable.splice(objetoEliminar,1)
                    let objetoAlmacenar = JSON.stringify(objetoEditable,null, "\t")

                    fs.promises.writeFile('productos.txt', objetoAlmacenar)
                        .then(() => {
                            console.log('Objeto guardado ')
                        })
                        .catch(() => {
                            console.log('error de guaraddo')
                        })
                }
                else{
                    console.log("no existe ese ID")
                }



            })
            .catch(err => {
                console.log('error de lectura', err)
            })
    }
}

let contenido = new Contenedor

app.get('/');

app.get('/', (req, res) => {
    res.send(`<h1>Bienvenidos a mi servidor Express</h1>`)
})

app.get('/productos', (req, res) => {
    let getAll = contenido.getAll()
    res.send(`${getAll}`)
})

app.get('/fyh', (req,res) => {
    res.send(`Hoy es lunes`)
})


const server = app.listen(PORT, () =>{
    const {port} = server.address();
    console.log(`Servidor escuchando  en el puerto ${port}`)
})