import express from "express"
import nunjucks from "nunjucks"
import logger from "./logger.ts"
import session from "express-session"

import ProductosRouter from "./routes/productos.ts"

const app = express()

// Middleware formularios
app.use(express.urlencoded({
    extended: true
}))

// Middleware sesiones
app.use(session({

    secret: "my-secret",

    resave: false,

    saveUninitialized: false

}))

app.use((req: any, res, next) => {

    res.locals.total_carrito =
        req.session.total_carrito || 0

    next()

})

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

logger.info("Servidor iniciando...")

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`)
})