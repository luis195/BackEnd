const fs = require('fs')

class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    save(object){

        let objetos = fs.readFileSync('productos.txt','utf-8').toString()
        let objetos2 = JSON.parse(objetos)
        let idNueva = objetos2.length + 1

        object.id = idNueva


        fs.appendFile('productos.txt',object, err => {
                if(err){
                    console.log('No se pudo guardar')
                }
                else {

                    console.log('guardado')
                }
            })
        }
    }
    
}