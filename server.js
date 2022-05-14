const express = require('express')
const app = express()

const carritoRoute = require('./routes/router_carrito')
const productoRoute = require('./routes/router_productos')
const route = require("./routes/index")

const port = process.env.PORT || 8080

app.use(express.static(__dirname+"/public"))
app.use(express.urlencoded({extended:true}))

app.use("/api", route)
app.use("/api/productos", productoRoute)
app.use("/api/carrito", carritoRoute)


app.listen(port, ()=>{
    console.log("Server is listening")
})