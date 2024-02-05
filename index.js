const ProductManager = require("./src/ProductManager.js")
let productManager = new ProductManager() // se crea la instancia de la clase
console.log(productManager)

let persistirProducto = async () => {
    await productManager.agregarProducto("'Miura'", "La Sportiva", 80000, "/path1", 125)
    await productManager.agregarProducto("'Katana'", "La Sportiva", 125000, "/path2", 200)
    await productManager.agregarProducto("Otaki", "La Sportiva", 101000, "/path3", 82)
    await productManager.agregarProducto("Selena", "Petzl", 124350, "/path4", 93)
    await productManager.agregarProducto("Ray", "Singing Rock", 40000, "/path5", 85)
    await productManager.agregarProducto("Jayne 3", "Edelrid", 7500, "/path6", 132)
    await productManager.agregarProducto("Colt Negro", "Singing Rock", 7500, "/path7", 163)
    await productManager.agregarProducto("Link", "Edelweiss", 10000, "/path8", 320)
    await productManager.agregarProducto("Argon S Black", "Kong", 13000, "/path9", 267)
    await productManager.agregarProducto("Rocklock Screwgate", "Black Diamond", 21265, "/path10", 165)

    let productos = await productManager.consultarProductos()
    console.log(`Productos encontrados en Product Manager: ${productos.length}`)
    console.log(productos)

    // IDs de los productos que deseas modificar y eliminar
    const productIdModificar = 0
    const productIdEliminar = 0

    // Obtener producto por ID y mostrar información antes de modificar
    const productoAntesModificar = await productManager.consultarProductosPorId(productIdModificar)
    console.log(`Producto ID ${productIdModificar} a modificar:`, productoAntesModificar)

    // Actualizar producto por ID
    const actualizarProducto = {}
    
    const productoActualizado = await productManager.actualizarProducto(productIdModificar, actualizarProducto)
    console.log(`Producto ID ${productIdModificar} actualizado:`, productoActualizado)

    // Obtener producto por ID y mostrar información antes de eliminar
    const productoAntesEliminar = await productManager.consultarProductosPorId(productIdEliminar)
    console.log(`Producto ID ${productIdEliminar} a eliminar:`, productoAntesEliminar)

    // Eliminar producto por ID
    const productoEliminado = await productManager.eliminarProducto(productIdEliminar)
    console.log(`El producto ID ${productIdEliminar} fue eliminado:`, productoEliminado)
}

persistirProducto()