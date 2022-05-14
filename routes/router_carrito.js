const express = require('express')
const fs =require("fs")
const {Router } = express
const {Carrito} = require('../classes/carrito')

const router = new Router()

router.get("/", (req, res) => {

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
router.post("/api/carrito", (req,res)=>{
    res.send("prueba")
})
router.put("/api/carrito", (req,res)=>{
    res.send("prueba")
})
router.delete("/:id", (req,res)=>{
    res.send("prueba")
})



module.exports = router