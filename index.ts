import express from "express"
import nunjucks from "nunjucks"
import logger from "./logger.ts"
import session from "express-session"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import cors from "cors"
import ApiRouter from "./routes/api.ts"
import UsuariosRouter from "./routes/usuarios.ts"
import ProductosRouter from "./routes/productos.ts"

const app = express()

app.use(cors())

app.use(cookieParser())

// Middleware formularios
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

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

app.use((req: any, res, next) => {

    const token =
        req.cookies.access_token

    if (token) {

        try {

            const data: any =
                jwt.verify(
                    token,
                    process.env.SECRET_KEY as string
                )

            req.usuario =
                data.usuario

            req.admin =
                data.admin

            app.locals.usuario =
                data.usuario

            app.locals.admin =
                data.admin

            logger.info(
                `Autentificado ${data.usuario}`
            )

        } catch {

            app.locals.usuario = undefined

            app.locals.admin = undefined

        }

    } else {

        app.locals.usuario = undefined

        app.locals.admin = undefined

    }

    next()

})

// Rutas
app.use("/", ProductosRouter)

app.use("/", UsuariosRouter)

app.use("/api", ApiRouter)

logger.info("Servidor iniciando...")

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`)
})