const express = require('express')
const fs = require('fs')


const {Router } = express

const router = new Router()

router.get("/", (req, res) => {
    fs.readFileSync("../productos.json", "uft-8", (err, data) =>{
        if(err) {
            console.log("error de lectura")
        }
        res.sendFile("../producots.html", {data: JSON.parse(data)})
    })
})

router.get("/:id", (req,res) =>{
    if (req.params.id) {
        fs.readFileSync("../productos.json", "uft-8", (err, data) =>{
            if(err) {
                console.log("error de lectura")
            }
            res.sendFile("../producots.html", {data: JSON.parse(data)})
        })
    } else {
        fs.readFileSync("../productos.json", "uft-8", (err, data) =>{
            if(err) {
                console.log("error de lectura")
            }
            let obj =JSON.parse(data).find(x =>{
                return x.id == req.params.id
            })
            res.sendFile("../producots.html", {data: obj})
        })
    }
})

router.post("/api/productos", (req,res)=>{
    fs.readFileSync("../productos.json", "uft-8", (err, data) =>{
        if(err) {
            console.log("error de lectura")
        }
        JSON.parse(data).push(req.body)
        res.send("Producto guardado exitosamente")
    })
})
router.post("/api/productos", (req,res)=>{
    res.send("prueba")
})
router.put("/api/productos", (req,res)=>{
    res.send("prueba")
})
router.delete("/api/productos", (req,res)=>{
    res.send("prueba")
})



module.exports = router