const express = require('express')
const app = express()

const carritoRoute = require('./routes/router_carrito')
const productoRoute = require('./routes/router_productos')


const port = process.env.PORT || 8080


app.use(express(__dirname+"/public"))

app.use("/api/productos", productoRoute)
app.use("/api/carrito", carritoRoute)


app.listen(port, ()=>{
    console.log("Server is listening")
})