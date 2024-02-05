class Product {
    constructor(nombre, descripcion, precio, rutaImagen, stock) {
        this.id = Product.getNextId()
        this.nombre = nombre
        this.descripcion = descripcion
        this.precio = precio
        this.rutaImagen = rutaImagen
        this.stock = stock
    }

    static getNextId() {
        // Counter para generar IDs únicos
        if (!Product.counter) {
            Product.counter = 1
        } else {
            Product.counter++
        }
        return Product.counter
    }
}

class ProductManager {
    // # --> Hace referencia a que las variables son privadas
    #products
    #productDirPath
    #productsFilePath
    #fileSystem

    constructor() {
        this.#products = new Array()
        this.#productDirPath = "./files"
        this.#productsFilePath = __dirname + "/files/Productos.json"
        this.#fileSystem = require("fs")
    }

    agregarProducto = async (nombre, descripcion, precio, rutaImagen, stock) => {
        let productoNuevo = new Product(nombre, descripcion, precio, rutaImagen, stock)
        console.log("Agregar Producto: producto a agregar:")
        console.log(productoNuevo)
        try {
            //Creamos el directorio
            await this.#fileSystem.promises.mkdir(this.#productDirPath, { recursive: true })

            //Validamos que exista ya el archivo con usuarios sino se crea vacío para ingresar nuevos:
            if (!this.#fileSystem.existsSync(this.#productsFilePath)) {
                //Se crea el archivo vacio.
                await this.#fileSystem.promises.writeFile(this.#productsFilePath, "[]")
            }

            //leemos el archivo
            let productosFile = await this.#fileSystem.promises.readFile(this.#productsFilePath, "utf-8")
        console.info("Archivo JSON obtenido desde archivo: ")
        console.log(productosFile)

        // Agregamos al array la información que hay en el archivo y además hacemos un parseo de .json a Objeto.
        this.#products = JSON.parse(productosFile)
        console.log("Productos encontrados: ")
        console.log(this.#products)

        // Asignamos un id autoincrementable
        const productoId = this.#products.length > 0 ? this.#products[this.#products.length - 1].id + 1 : 1

        // Asignamos el id y agregamos el producto al array de productos
        const productoNuevo = new Product(nombre, descripcion, precio, rutaImagen, stock)
        productoNuevo.id = productoId
        this.#products.push(productoNuevo)
        console.log("Lista actualizada de productos: ")
        console.log(this.#products)

        // Sobreescribimos el archivo de usuarios para persistencia.
        await this.#fileSystem.promises.writeFile(this.#productsFilePath, JSON.stringify(this.#products, null, 2, '\t'))

    } catch (error) {
        console.error(`Error creando producto nuevo: ${JSON.stringify(productoNuevo)}, detalle del error: ${error}`)
        throw Error(`Error creando producto nuevo: ${JSON.stringify(productoNuevo)}, detalle del error: ${error}`)
    }
}

    consultarProductos = async () => {
        try {
            //Creamos el directorio
            await this.#fileSystem.promises.mkdir(this.#productDirPath, { recursive: true })

            //Validamos que exista ya el archivo con usuarios sino se crea vacío para ingresar nuevos:
            if (!this.#fileSystem.existsSync(this.#productsFilePath)) {
                //Se crea el archivo vacio.
                await this.#fileSystem.promises.writeFile(this.#productsFilePath, "[]")
            }

            //leemos el archivo
            let productosFile = await this.#fileSystem.promises.readFile(this.#productsFilePath, "utf-8")
            //Obtenemos el JSON String 
            console.info("Archivo JSON obtenido desde archivo: ")
            console.log(productosFile)

            this.#products = JSON.parse(productosFile)
            console.log("Productos encontrados: ")
            console.log(this.#products)

            return this.#products
        } catch (error) {
            console.error(`Error consultando los usuarios por archivo, valide el archivo: ${this.#productDirPath}, 
                detalle del error: ${error}`)
            throw Error(`Error consultando los usuarios por archivo, valide el archivo: ${this.#productDirPath},
             detalle del error: ${error}`)
        }
    }

    consultarProductosPorId = async (productId) => {
        try {
            const products = await this.consultarProductos()
            const product = products.find((p) => p.id === productId)
            return product
        } catch (error) {
            console.error(`Error obteniendo producto por ID: ${productId}, detalle del error: ${error}`)
            throw Error(`Error obteniendo producto por ID: ${productId}, detalle del error: ${error}`)
        }
    }

    actualizarProducto = async (productId, actualizarProducto) => {
        try {
            const products = await this.consultarProductos()
            const index = products.findIndex((p) => p.id === productId)

            if (index !== -1) {
                // Actualizar el producto sin borrar su ID
                Object.assign(products[index], actualizarProducto)

                // Actualizar el archivo con la lista de productos actualizada
                await this.#fileSystem.promises.writeFile(this.#productsFilePath, JSON.stringify(products, null, 2, '\t'))

                return products[index]
            } else {
                console.error(`Producto con ID ${productId} no encontrado.`)
                return null
            }
        } catch (error) {
            console.error(`Error actualizando producto por ID: ${productId}, detalle del error: ${error}`)
            throw Error(`Error actualizando producto por ID: ${productId}, detalle del error: ${error}`)
        }
    }

    eliminarProducto = async (productId) => {
        try {
            let products = await this.consultarProductos()
            const index = products.findIndex((p) => p.id === productId)

            if (index !== -1) {
                // Eliminar el producto del array
                const deletedProduct = products.splice(index, 1)[0]

                // Actualizar el archivo con la lista de productos actualizada
                await this.#fileSystem.promises.writeFile(this.#productsFilePath, JSON.stringify(products, null, 2, '\t'))

                return deletedProduct;
            } else {
                console.error(`Producto con ID ${productId} no encontrado.`)
                return null
            }
        } catch (error) {
            console.error(`Error eliminando producto por ID: ${productId}, detalle del error: ${error}`)
            throw Error(`Error eliminando producto por ID: ${productId}, detalle del error: ${error}`)
        }
    }
}

module.exports = ProductManager