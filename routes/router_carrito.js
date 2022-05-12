const express = require('express')
const fs =require("fs")
const {Router } = express

const router = new Router()

router.get("/", (req, res) => {

})

router.post("/:id/productos", (req,res)=>{
    fs.readFileSync("../productos.json", "uft-8", (err, data) =>{
        if(err) {
            console.log("error de lectura")
        }
        JSON.parse(data).push(req.body)
        res.send("Producto guardado exitosamente")
        let arr = JSON.parse(data)
        let object
    })
})
router.post("/api/carrito", (req,res)=>{
    res.send("prueba")
})
router.put("/api/carrito", (req,res)=>{
    res.send("prueba")
})
router.delete("/api/carrito", (req,res)=>{
    res.send("prueba")
})



module.exports = router