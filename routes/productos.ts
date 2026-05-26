import express from "express"

import prisma from "../prisma/prisma.client.ts"
import logger from "../logger.ts"

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

router.post("/al-carrito/:id", async (req: any, res) => {

    const id = Number(req.params.id)

    const cantidad = Number(req.body.cantidad)

    logger.info(
        `Producto ${id} añadido al carrito (${cantidad})`
    )

    if (cantidad > 0) {

        if (req.session.carrito !== undefined) {

            req.session.carrito.push({
                id,
                cantidad
            })

        } else {

            req.session.carrito = [{
                id,
                cantidad
            }]

        }

        let total_carrito = 0

        for (const item of req.session.carrito) {

            total_carrito += item.cantidad

        }

        req.session.total_carrito = total_carrito

    }

    res.redirect(`/producto/${id}`)

})

export default router