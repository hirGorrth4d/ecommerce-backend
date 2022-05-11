const express = require('express')
const app = express()

const router = require('./routes/router')

const port = process.env.PORT || 8080

app.use(express(__dirname+"/public"))

app.use("/api", router)

router.get("/productos", (req,res)=>{
    res.send("prueba")
})

app.listen(port, ()=>{
    console.log("Server is listening")
})