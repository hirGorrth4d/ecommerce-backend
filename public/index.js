
const renderProducts = (data) => {
    let html = data.map(x => {
        return `Producto: ${x.nombre} Descripcion: ${x.descripcion} Precio: ${x.precio}, Stock: ${x.stock}`
    })
    document.querySelector("#productos").innerHTML = html
}
