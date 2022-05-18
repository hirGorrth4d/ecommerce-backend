const express = require('express')
const fs =require("fs")
const {Router } = express
const {Carrito} = require('../classes/carrito')
const {Producto} = require('../classes/producto')

const router = new Router()

const carrito = new Carrito(__dirname + "/data/carrito.json")
const producto = new Producto(__dirname + "/data/productos.json")

router.get("/", (req, res) => {
    const cart = carrito.getAll()
    res.json(cart)
})

router.post("/", (req,res) =>{
    const products = req.body.products.map(Number)
    const allProducts = producto.getAll()
    const productFind = allProducts.flter((product) => {
        products.includes(product.id)
    })
    const cart = carrito.save({products: productFind})
    res.json(cart)
})

router.post("/:id/productos/:idCarrito", (req,res)=>{
    fs.readFileSync("../productos.json", "uft-8", (err, data) =>{
        if(err) {
            console.log("error de lectura")
        }
        JSON.parse(data).push(req.body)
        res.send("Producto guardado exitosamente")
        let arr = JSON.parse(data)
        let objSelected = arr.find(x => {
            return x.id === req.params.id 
        })
    })
    fs.readFileSync("../carrito.json", "uft-8", (err, data) =>{
        if(err) {
            console.log("error de lectura")
        }

        let arr = JSON.parse(data)
        let cartSelected = arr.find(x => {
            return x.id === req.params.id
        })
        cartSelected.productos.push(objSelected)
        fs.writeFileSync("../carrito.json", JSON.stringify(arr), "utf-8", () =>{
            if (err) {
                console.log("error")
            }
            console.log("error")
        })
    })
})
router.post("/:id/productos", (req,res)=>{
    const id = parseInt(req.params.id)
    const products = req.body.products.map(Number)
    const allProducts = producto.getAll()
    const productFind = allProducts.flter((product) => {
        products.includes(product.id)
    })
    if (productFind.length === 0){
        res.json("no se encontraron productos")
    } else {
        const result = carrito.addProductoCartById(id, productFind)
        res.json(result)
    }
    

})

router.delete("/:id", (req,res)=>{
    const id = parseInt(req.params.id)
    const cart = carrito.deleteById(id)
    res.json(cart)
})
router.delete("/:id/productos/:id_prod", (req,res)=>{
    const id = parseInt(req.params.id)
    const productId= parseInt(req.params.id_prod)
    const cart = carrito.deleteProductoFromCartById(id, productId)
    res.json(cart)
})


module.exports = router