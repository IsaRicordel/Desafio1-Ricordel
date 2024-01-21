class ProductManager {
    constructor() {
        this.productos = [];
    }

    addProducto(nombre, descripcion, precio, rutaImagen, stock) {
        // Validar que todos los campos sean obligatorios
        if (!nombre || !descripcion || !precio || !rutaImagen || !stock) {
            console.error("Todos los campos son obligatorios.");
            return;
        }

        // Generar un id autoincrementable
        const productoId = this.productos.length + 1;

        // Verificar duplicados por ID
        const idExiste = this.productos.some(producto => producto.id === productoId)
        if (idExiste) {
            console.error("El código ya existe. Intente con otro código.")
            return
        }
               
        // Crear el nuevo producto
        const nuevoProducto = {
            id: productoId,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            rutaImagen: rutaImagen,
            stock: stock,
        };

        // Agregar el producto al array de productos
        this.productos.push(nuevoProducto);

        console.log(`Producto agregado con éxito. ID: ${productoId}`);
    }

    getProducts() {
        return this.productos;
    }

    getProductById(productoId) {
        // Buscar el producto por ID
        const foundProducto = this.productos.find((producto) => producto.id === productoId);

        // Mostrar error si no se encuentra el ID
        if (!foundProducto) {
            console.error("Producto no encontrado.");
        }

        return foundProducto;
    }
}

// Ejemplo de uso
const productManager = new ProductManager()

// Agregar productos
productManager.addProducto("Pédulas", "La Sportiva", 257000, "/path1", 130)
productManager.addProducto("Arnés", "Edelweiss", 267000, "/path2", 78)


// Obtener todos los productos
console.log("Todos los productos:", productManager.getProducts())

// Buscar producto por ID
const productIdToSearch = 3
const foundProducto = productManager.getProductById(productIdToSearch)

if (foundProducto) {
    console.log(`Producto encontrado por ID ${productIdToSearch}:`, foundProducto)
}