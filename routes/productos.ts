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

            const existente =
                req.session.carrito.find(
                    (item: any) =>
                        item.id === id
                )

            if (existente) {

                existente.cantidad += cantidad

            } else {

                req.session.carrito.push({
                    id,
                    cantidad
                })

            }

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

// API carrito
router.get("/api/carrito", async (req: any, res) => {

    try {

        const carrito =
            req.session.carrito || []

        const productos = []

        for (const item of carrito) {

            const producto =
                await prisma.producto.findUnique({

                    where: {
                        id: item.id
                    }

                })

            if (producto) {

                productos.push({

                    ...producto,

                    cantidad: item.cantidad

                })

            }

        }

        res.json(productos)

    } catch (error: any) {

        res.status(500).json({

            error: error.message

        })

    }

})

// eliminar del carrito
router.delete(
    "/api/carrito/:id",
    async (req: any, res) => {

        try {

            const id =
                Number(req.params.id)

            const carrito =
                req.session.carrito || []

            const producto =
                carrito.find(
                    (item: any) =>
                        item.id === id
                )

            if (producto) {

                if (producto.cantidad > 1) {

                    producto.cantidad--

                } else {

                    req.session.carrito =
                        carrito.filter(
                            (item: any) =>
                                item.id !== id
                        )

                }

            }

            req.session.total_carrito =
                req.session.carrito.reduce(

                    (
                        total: number,
                        item: any
                    ) => total + item.cantidad,

                    0
                )

            res.json({
                success: true
            })

        } catch (error: any) {

            res.status(500).json({

                error: error.message

            })

        }

    }
)

export default router