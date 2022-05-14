const express = require('express')
const fs = require('fs')
const {Router } = express
const {Producto} = require('../classes/producto')

const router = new Router()
router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.get("/productos", (req, res) => {
    fs.readFileSync("../data/productos.json", "uft-8", (err, data) =>{
        if(err) {
            console.log("error de lectura")
        }
        res.sendFile(__dirname+"/public/productos.html", {data: JSON.parse(data)})
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

router.get("/form", (req,res) =>{
    if (req.query.admin) {
        res.sendFile("form.html")
    } else {
        res.send("No autorizado")
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

router.put("/api/productos", (req,res)=>{
    res.send("prueba")
})
router.delete("/api/productos", (req,res)=>{
    res.send("prueba")
})



module.exports = router