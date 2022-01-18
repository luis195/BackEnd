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
        let b = fs.promises.readFile('productos.txt','utf-8')
            .then(contenido => {
                let objetoEditable = JSON.parse(contenido)
                let elemento = objetoEditable.findIndex(ind => ind.id === identificacion)
                if (elemento !== -1){
                    //console.log(objetoEditable[elemento])
                    return objetoEditable
                }
                else {
                    console.log(null)
                }

            })
            .catch(err => {
                console.log('error de lectura', err)
            })
        return b
    }
    getAll(){
        let b = fs.promises.readFile('productos.txt','utf-8')
                .then(contenidos => {
                    let objetoEditable = JSON.parse(contenidos)
                    //console.log(objetoEditable)
                    return objetoEditable
                })

                .catch(err => {
                    console.log('error de lectura', err)
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

let contenido = new Contenedor();

app.get('/');

app.get('/', (req, res) => {
    res.send(`<h1>Bienvenidos a mi servidor Express</h1>`)
})

app.get('/productos', async (req, res) => {
    let productos = await contenido.getAll()
    res.send(`${productos}`)
})

app.get('/productRandom', async (req,res) => {
    let id = Math.floor(Math.random() * 4);
    let productos = await contenido.getById(2)
    res.send(`${productos}`)
})


const server = app.listen(PORT, () =>{
    const {port} = server.address();
    console.log(`Servidor escuchando  en el puerto ${port}`)
})