const fs = require('fs')

class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }
    save(producto){
        fs.promises.readFile('productos.txt', 'utf8')
            .then(contenido => {

                let objetoEditable = JSON.parse(contenido)
                producto.id = objetoEditable.length
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
                    let objetoAlmacenar = JSON.stringify(objetoEditable)

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
let object = {
    title: 'regla',
    price: 10,
    thumbnail: 'http link'
}

contenido = new Contenedor('productos.txt')
contenido.getAll()
//contenido.save(object)
contenido.getById(5)
//contenido.deleteById()
//contenido.deleteAll()
