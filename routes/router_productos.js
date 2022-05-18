const express = require('express')
const fs = require('fs')
const {Router } = express
const {Producto} = require('../classes/producto')

const router = new Router()
router.use(express.json())
router.use(express.urlencoded({extended:true}))
const producto = new Producto(__dirname + "/data/productos.json")

router.get("/productos", (req, res) => {
    // fs.readFileSync("../data/productos.json", "uft-8", (err, data) =>{
    //     if(err) {
    //         console.log("error de lectura")
    //     }
    //     res.sendFile(__dirname+"/public/productos.html", {data: JSON.parse(data)})
    // })
    const allProducts = producto.getAll()
    res.json(allProducts)
})

router.get("/:id", (req,res) =>{
    // if (req.params.id) {
    //     fs.readFileSync("../productos.json", "uft-8", (err, data) =>{
    //         if(err) {
    //             console.log("error de lectura")
    //         }
    //         res.sendFile("../producots.html", {data: JSON.parse(data)})
    //     })
    // } else {
    //     fs.readFileSync("../productos.json", "uft-8", (err, data) =>{
    //         if(err) {
    //             console.log("error de lectura")
    //         }
    //         let obj =JSON.parse(data).find(x =>{
    //             return x.id == req.params.id
    //         })
    //         res.sendFile("../producots.html", {data: obj})
    //     })
    // }
    const id = parseInt(req.params.id)
    const result = producto.getById(id)
    res.json(result)
})


router.post("/productos", (req,res)=>{
    // fs.readFileSync("../productos.json", "uft-8", (err, data) =>{
    //     if(err) {
    //         console.log("error de lectura")
    //     }
    //     JSON.parse(data).push(req.body)
    //     res.send("Producto guardado exitosamente")
    
    // })
    if (req.params.admin) {
        const product = req.body
        const result = producto.saveProducts(product)
        res.json(result)

    } else {
        res.send("no tenes permiso para ver esto")
    }
})

router.put("/:id", (req,res)=>{
    if (req.params.admin) {
        
         const id  = parseInt(req.params.id)
         const product = req.body
         const result = producto.updateById(id, product)
         res.json(result)

    } else {
        res.send("no tenes permiso para ver esto")
    }
})
router.delete("/:id", (req,res)=>{
    if (req.params.admin) {
        const id = parseInt(req.params.id)
        const result = producto.deleteByID(id)
        res.json(result)

    } else {
        res.send("no tenes permiso para ver esto")
    }
})





module.exports = router