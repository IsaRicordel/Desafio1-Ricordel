const ProductManager = require("./ProductManager.js")
let productManager = new ProductManager() // se crea la instancia de la clase
console.log(productManager)

let persistirProducto = async () => {
    await productManager.agregarProducto("Arnés", "Edelweiss", 60000, "/path1", 125)
    await productManager.agregarProducto("Arnés", "Petzl", 125000, "/path2", 200)
    await productManager.agregarProducto("Pédulas", "La Sportiva", 45000, "/path3", 82)
    await productManager.agregarProducto("Mosquetón", "Edelweiss", 25000, "/path4", 85)
    await productManager.agregarProducto("Mosquetón", "Blackdiamond", 7500, "/path5", 132)

    let productos = await productManager.consultarProductos()
    console.log(`Productos encontrados en Product Manager: ${productos.length}`)
    console.log(productos)

    // IDs de los productos que deseas modificar y eliminar
    const productIdModificar = 4
    const productIdEliminar = 5

    // Obtener producto por ID y mostrar información antes de modificar
    const productoAntesModificar = await productManager.consultarProductosPorId(productIdModificar)
    console.log(`Producto antes de modificar por ID ${productIdModificar}:`, productoAntesModificar)

    // Actualizar producto por ID
    const actualizarProducto = {
        descripcion: "Petzl",
        precio: 48000,
        stock: 154
    }
    const productoActualizado = await productManager.actualizarProducto(productIdModificar, actualizarProducto)
    console.log(`Producto actualizado por ID ${productIdModificar}:`, productoActualizado)

    // Obtener producto por ID y mostrar información antes de eliminar
    const productoAntesEliminar = await productManager.consultarProductosPorId(productIdEliminar)
    console.log(`Producto antes de eliminar por ID ${productIdEliminar}:`, productoAntesEliminar)

    // Eliminar producto por ID
    const productoEliminado = await productManager.eliminarProducto(productIdEliminar)
    console.log(`Producto eliminado por ID ${productIdEliminar}:`, productoEliminado)
}

persistirProducto()