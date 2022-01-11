const fs = require('fs')
//agregar
async function hola(texto) {
    try {
        await fs.promises.appendFile('productos.txt', texto)
        console.log('agregado')

    }
    catch (err){
        console.log('hubo un error')
    }

}
//abrir y obtener lo que esta en el archivo

async function escribir(texto){
    try{
        await fs.promises.writeFile('productos.txt', texto)
        console.log('guardado')
    }
    catch (err){
        console.log('no pudo ser guardado')
    }
}

function leerTC(producto){
    let id

    fs.promises.readFile('productos.txt', 'utf8')
        .then(contenido => {

            objetoEditable = JSON.parse(contenido)
            producto.id = objetoEditable.length + 1
            id = producto.id
            objetoEditable.push(producto)
            //console.log(objetoEditable)
            objetoAlmacenar = JSON.stringify(objetoEditable)
            //console.log(objetoAlmacenar)

            fs.promises.writeFile('productos.txt', objetoAlmacenar)
                .then(prod=>{
                    id = producto.id
                })
                .catch(err => {
                        console.log('error de guaraddo', err)
                })
            return id
        })
        .catch(err => {
            console.log('error de lectura', err)
        })
    console.log(id)
}

function getById(id){
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

function deleteById(id){
    fs.promises.readFile('productos.txt','utf-8')
        .then(contenido => {
            let objetoEditable = JSON.parse(contenido)
            if (id >= 0 && id < objetoEditable.length){
                objetoEditable = objetoEditable.splice(1, id-1)
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
let p = [
    {
        nombre: 'luis',
        id: 3
    },
    {
        nombre: 'juan',
        id: 7
    }
]











