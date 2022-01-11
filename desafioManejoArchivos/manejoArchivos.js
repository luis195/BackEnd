const fs = require('fs')

class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }
    save(producto){
        fs.promises.readFile('productos.txt', 'utf8')
            .then(contenido => {

                let objetoEditable = JSON.parse(contenido)
                producto.id = objetoEditable.length + 1
                objetoEditable.push(producto)
                let objetoAlmacenar = JSON.stringify(objetoEditable)

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
    getById(id){
        fs.promises.readFile('productos.txt','utf-8')
            .then(contenido => {
                let objetoEditable = JSON.parse(contenido)
                if (id >= 0 && id < objetoEditable.length){
                    console.log(objetoEditable[id-1])
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

    }
    deleteById(id){
        fs.promises.readFile('productos.txt','utf-8')
            .then(contenido => {
                let objetoEditable = JSON.parse(contenido)
                if (id >= 0 && id < objetoEditable.length){
                    objetoEditable = objetoEditable.splice(id-1)
                    let objetoAlmacenar = JSON.stringify(objetoEditable)

                    fs.promises.writeFile('productos.txt', objetoAlmacenar)
                        .then(() => {
                            console.log('Objeto guardado ')
                        })
                        .catch(() => {
                            console.log('error de guaraddo')
                        })
                }
                else {
                    console.log(null)
                }



            })
            .catch(err => {
                console.log('error de lectura', err)
            })

    }

    }

