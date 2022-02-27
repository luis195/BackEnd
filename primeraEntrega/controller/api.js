let fs = require('fs')
// listado de productos
class ProductosApi {
    constructor() {
        this.productos = JSON.parse(fs.readFileSync('./controller/productos.txt',"utf-8"))
        this.id = 0
        this.timeStamp = Date.now
    }
    //GET
    listar(id) {
        const prod = this.productos.find(prod => prod.id === id)
        return prod || { error: 'producto no encontrado' }
    }
    //GET
    listarAll() {
        return this.productos
    }
    //POST
    guardar(prod) {
        const newProd = { ...prod, id: ++this.id }
        this.productos.push(newProd)
        fs.writeFileSync('./controller/productos.txt',JSON.stringify(this.productos,null,"\t") ,"utf-8")
        return newProd
    }
    //PUT
    actualizar(prod, id) {
        const newProd = { id: Number(id), ...prod }
        const index = this.productos.findIndex(p => p.id === id)
        if (index !== -1) {
            this.productos[index] = newProd
            fs.writeFileSync('./controller/productos.txt',JSON.stringify(this.productos,null,"\t") ,"utf-8")
            return newProd
        } else {
            return { error: 'producto no encontrado' }
        }
    }
    //DELETE
    borrar(id) {
        const index = this.productos.findIndex(prod => prod.id === id)
        if (index !== -1) {
            fs.writeFileSync('./controller/productos.txt',JSON.stringify(this.productos,null,"\t") ,"utf-8")
            return this.productos.splice(index, 1)
        } else {
            return { error: 'producto no encontrado' }
        }
    }
}

//clase que almacena los productos en un carrito
class Carrito {
    constructor(productosEnCarrito, id) {
        this.productosEnCarrito = productosEnCarrito
        this.timeStamp = Date.now()
        this.id = id
    }

    //metodo para GET obtener todos los productos del carrito
    listarAll() {

        return this.productosEnCarrito
    }

    // metodo para POST: '/:id/productos' guardar nuevo producto en el carrito
    guardar(prod) {
        const newProd = { ...prod, id: ++this.id }
        this.productosEnCarrito.push(newProd)
        return newProd
    }

    //metodo para DELETE: '/:id/productos/:id_prod'
    borrar(id) {
        const index = this.productosEnCarrito.findIndex(prod => prod.id === id)
        if (index !== -1) {
            return this.productosEnCarrito.splice(index, 1)
        } else {
            return { error: 'producto no encontrado' }
        }
    }

}

//clase que almacena todos los carritos de compra
class TodosLosCarritos {
    constructor() {
        this.carritos = JSON.parse(fs.readFileSync('./controller/carritos.txt' ,"utf-8"))
    }
    // metodo para POST: '/' - Crea un carrito y devuelve su id.
    crearCarrito(){
        let idNuevoCarrito = this.carritos.length + 1
        let carritoNuevo = new Carrito([], idNuevoCarrito)
        this.carritos.push(carritoNuevo)
        fs.writeFileSync('./controller/carritos.txt',JSON.stringify(this.carritos,null,"\t") ,"utf-8")
        return carritoNuevo.id
    }
    // metodo DELETE: '/:id' - Vacía un carrito y lo elimina.

    borrarCarrito(id){
        console.log(this.carritos)
        const index = this.carritos.findIndex(kart => kart.id === id)
        if (index !== -1) {
            this.carritos = this.carritos.splice(index, 1)
            console.log(this.carritos)
            fs.writeFileSync('./controller/carritos.txt',JSON.stringify(this.carritos,null,"\t") ,"utf-8")
            return this.carritos
        } else {
            return { error: 'producto no encontrado' }
        }

    }

    listarCarrito(id){
        return(this.carritos[id])
    }

    borrarProductoCarrito(idCarrito, idProducto) {
        const carritos = JSON.parse(fs.readFileSync('./controller/carritos.txt', "utf-8"))
        const carrito = carritos.filter(cart => cart.id === idCarrito)
        if (carrito.length > 0) {
            const indexProduct = carrito[0].productosEnCarrito.findIndex(prod => prod.id === idProducto)
            if (indexProduct !== -1) {
                const productDeleted = carrito[0].productosEnCarrito.splice(indexProduct, 1)
                fs.writeFileSync('./controller/carritos.txt',JSON.stringify(carritos,null,"\t") ,"utf-8")
                return productDeleted[0]
            } else {
                throw new Error(`El producto con id ${idProducto} no existe`)
            }
        } else {
            throw new Error(`El carrito con id ${idCarrito} no existe`)
        }
    }

    incorporarProductoPorID(idProducto) {
        let productoIncorporar = 0
        let listadoActual = JSON.parse(fs.readFileSync('./controller/productos.txt', "utf-8"))
        for (let i = 0; i < listadoActual.length; i++) {
            if (listadoActual[i].id === idProducto) {
                productoIncorporar = JSON.parse(listadoActual[i])
            }
        }return productoIncorporar
    }
}

module.exports.ProductosApi = ProductosApi
module.exports.Carrito = Carrito
module.exports.TodosLosCarritos = TodosLosCarritos