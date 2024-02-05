const express = require('express')
const ProductManager = require('../src/ProductManager.js')

const app = express()
const port = 8080

const productManager = new ProductManager()

// Middleware para parsear JSON en las solicitudes
app.use(express.json())

// Endpoint para obtener todos los productos o limitar por query param
app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit
        let productos = await productManager.consultarProductos()

        if (limit) {
            productos = productos.slice(0, parseInt(limit, 10))
        }

        res.json({ productos })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al obtener los productos.' })
    }
})

// Endpoint para obtener un producto por ID
app.get('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid, 10)
        const producto = await productManager.consultarProductosPorId(productId)

        if (producto) {
            res.json({ producto })
        } else {
            res.status(404).json({ error: 'Producto no encontrado.' })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el producto.' })
    }
})

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`)
})