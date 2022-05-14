const fs = require('fs')
class Carrito {
    constructor(id, producto){
        this.id = id,
        this.productos = producto
    }
    getId(){
        return this.id
    }
    getProductos(){
        return this.productos
    }
    getTimestamp(){
        const date = Date.now()
        const today = new Date(date)
        const timestamp = today.toUTCString()
        return timestamp
    }
    setProductos(producto){
        this.productos = producto
    }
    getAll(){
        const data = fs.writeFileSync('../data/carrito.json', 'utf-8')
        const cart = JSON.parse(data)
        return cart
    }
    getById(id) {
        const carts=this.getAll()
        const cart = cart.find(x=>x.id === id)
        return 'Producto encontrado'
    }
    deleteProductoFromCartById(idCart, idProduct) {
        const carts = this.getAll()
        const cartIndex = carts.find(x => x.id === id)
        const cart = carts[cartIndex]
        if (!cart.producto.find(x=>x.id === idProduct)){
            return 'producto no encontrado'
        }
        cart.producto = cart.producto.filter(p => p.id !== idProduct)
        carts[cartIndex] = cart
        fs.writeFileSync('../data/carrito.json', JSON.stringify(carts))
        return 'producto eliminado del carrito'
    }
    addProductoCartById(id, producto){
        const carts = this.getAll()
        const cartIndex = carts.findIndex(x => x.id ===id)
        const cart = carts[cartIndex]
        cart.producto = [...cart.producto, ...producto]
        carts[cartIndex]= cart
        fs.writeFileSync('../data/carrito.json', JSON.stringify(carts))
        return 'producto agregado al carrito'
    }
    deleteById(id) {
        const carts = this.getAll()
        const eliminarCart = carts.find(x=> x.id === id)
        const cartsFiltered = carts.filter(x=>x.id !== id)
        fs.writeFileSync('../data/carrito.json', JSON.stringify(cartsFiltered))
        console.log(`eliminado ${eliminarCart}`)

    }

    save(cart) {
        const carts =this.getAll()
        const idCart = carts.length > 0 ? carts[carts.length -1 ].id + 1 : 1
        const newCart = new Carrito(idCart, cart.productos)
        carts.push(newCart)
        fs.writeFileSync('../data/carrito.json', JSON.stringify(carts))
        return 'carrito guardado'
    }
}

module.exports = {Carrito}