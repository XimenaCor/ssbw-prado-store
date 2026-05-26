import express from "express"
import nunjucks from "nunjucks"

const app = express()
const PORT = 3000

// Configurar nunjucks
nunjucks.configure("views", {
    autoescape: true,
    express: app
})

// Archivos estáticos
app.use("/public", express.static("public"))

// Ruta principal
app.get("/", (req, res) => {
    res.render("home.njk", {
        titulo: "SSBW funcionando 🚀"
    })
})

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`)
})