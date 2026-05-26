import express from "express"
import nunjucks from "nunjucks"

import ProductosRouter from "./routes/productos.ts"

const app = express()

const PORT = 3000

// Configurar nunjucks
nunjucks.configure("views", {
    autoescape: true,
    express: app
})

// Archivos estáticos
app.use("/public", express.static("public"))

// Imágenes
app.use("/public/imagenes", express.static("imagenes"))

// Rutas
app.use("/", ProductosRouter)

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`)
})