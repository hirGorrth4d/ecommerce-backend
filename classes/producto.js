const fs = require('fs')
class Producto {
    constructor (id, nombre, descripcion, code, stock, precio, thumbnail){
        this.id = id,
        this.nombre = nombre,
        this.descripcion = descripcion,
        this.code = code,
        this.stock = parseInt(stock),
        this.precio = parseFloat(precio),
        this.thumbnail = thumbnail
    }

    getId(){
        return this.id
    }
    getTitle(){
        return this.nombre
    }
    getThumbnail(){
        return this.thumbnail
    }
    getPrice(){
        return this.precio
    }
    getDescription(){
        return this.descripcion
    }
    getCode(){
        return this.code
    }
    getStock(){
        return this.stock
    }
    getTimestamp(){
        const date = Date.now()
        const today = new Date(date)
        const timestamp = today.toUTCString()
        return timestamp
    }
    setTitle(nombre){
        this.nombre = nombre
    }
    setDescription (descripcion){
        this.descripcion = descripcion
    }
    setCode(code){
        this.code = code
    }
    setStock(stock){
        this.stock = parseInt(stock)
    }
    setPrice(precio){
        this.precio = parseFloat(precio)
    }
    setThumbnail(thumbnail){
        this.thumbnail = thumbnail
    }
    getAll(){
        const data = fs.readFileSync("../data/productos.json", "utf-8")
        const products = JSON.parse(data)
        return products
    }
    saveProducts(productos){
        const products = this.getAll()
        const idProduct = products.length > 0 ? products[products.length - 1].id +1 : 1
        const newProducto = new Producto(
            idProduct,
            productos.nombre,
            productos.descripcion,
            productos.code,
            productos.stock,
            productos.precio,
            productos.thumbnail
        )
        products.push(newProducto)
        fs.writeFileSync("../data/productos.json", JSON.stringify(products))
        return console.log("producto guardado", {data: products})
    }
    getById(id) {
        const products = this.getAll
        const product = products.find(x=> x.id === id)
        if (product){
            console.log("Producto encontrado")
        }
    }
    deleteByID(id){
        const products = this.getAll()
        const productFiltered = products.filter(x => x.id !==id)
        fs.writeFileSync('../data/productos.json', JSON.stringify(productFiltered))
        return 'Producto eliminado'
    }
    deleteAll() {
        fs.writeFileSync('../data/productos.json', '[]')
        return 'Productos eliminados'
    }
    updateById(id, newProduct){
        const products = this.getAll()
        const indexProduct = products.findIndex(x => x.id ===id)
        const productToBeUpdated = products[indexProduct]

        if (newProduct.nombre) {
            productToBeUpdated.nombre = newProduct.nombre
        }
        if (newProduct.descripcion) {
            productToBeUpdated.descripcion = newProduct.descripcion
        }
        
        if (newProduct.code) {
            productToBeUpdated.code = newProduct.code
        }
        
        if (newProduct.stock) {
            productToBeUpdated.stock = parseInt(newProduct.stock)
        }
        
        if (newProduct.precio) {
            productToBeUpdated.precio = parseFloat(newProduct.precio)
        }
        
        if (newProduct.thumbnail) {
            productToBeUpdated.thumbnail = newProduct.thumbnail
        }
        products[indexProduct] = productToBeUpdated

        fs.writeFileSync('../data/productos.json', JSON.stringify(products))
        return 'Producto Actualizado'
    }
}

module.exports = {Producto}