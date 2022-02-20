// listado de productos
class ProductosApi {
    constructor() {
        this.productos = []
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
        return newProd
    }
    //PUT
    actualizar(prod, id) {
        const newProd = { id: Number(id), ...prod }
        const index = this.productos.findIndex(p => p.id === id)
        if (index !== -1) {
            this.productos[index] = newProd
            return newProd
        } else {
            return { error: 'producto no encontrado' }
        }
    }
    //DELETE
    borrar(id) {
        const index = this.productos.findIndex(prod => prod.id === id)
        if (index !== -1) {
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
        const index = this.productos.findIndex(prod => prod.id === id)
        if (index !== -1) {
            return this.productos.splice(index, 1)
        } else {
            return { error: 'producto no encontrado' }
        }
    }

}

//clase que almacena todos los carritos de compra
class TodosLosCarritos {
    constructor() {
        this.carritos = []
    }
    // metodo para POST: '/' - Crea un carrito y devuelve su id.
    crearCarrito(){
        let idNuevoCarrito = this.carritos.length + 1
        let carritoNuevo = new Carrito([], idNuevoCarrito)
        this.carritos.push(carritoNuevo)
        return carritoNuevo.id
    }
}

module.exports.ProductosApi = ProductosApi
module.exports.Carrito = Carrito
module.exports.TodosLosCarritos = TodosLosCarritos