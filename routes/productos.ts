import express from "express"

import prisma from "../prisma/prisma.client.ts"

const router = express.Router()

// Portada
router.get("/", async (req, res) => {

    try {

        const cards = await prisma.producto.findMany()

        res.render("portada.njk", {
            cards
        })

    } catch (error: any) {

        console.error(error.message)

        res.status(500).send(error.message)

    }

})

// Detalle producto
router.get("/producto/:id", async (req, res) => {

    try {

        const id = Number(req.params.id)

        const card = await prisma.producto.findUnique({
            where: {
                id
            }
        })

        res.render("detalle.njk", {
            card
        })

    } catch (error: any) {

        console.error(error.message)

        res.status(500).send(error.message)

    }

})

router.get("/buscar", async (req, res) => {

    try {

        const busqueda = String(req.query.busqueda || "")

        const cards = await prisma.producto.findMany({
            where: {
                titulo: {
                    contains: busqueda,
                    mode: "insensitive"
                }
            }
        })

        res.render("portada.njk", {
            cards,
            busqueda
        })

    } catch (error: any) {

        console.error(error.message)

        res.status(500).send(error.message)

    }

})

export default router