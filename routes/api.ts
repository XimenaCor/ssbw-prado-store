import express from "express"

import prisma from "../prisma/prisma.client.ts"

const router = express.Router()

// GET todos productos
router.get("/productos", async (req, res) => {

    try {

        const desde =
            Number(req.query.desde) || 0

        const hasta =
            Number(req.query.hasta) || 20

        const orden =
            req.query.orden === "desc"
                ? "desc"
                : "asc"

        const productos =
            await prisma.producto.findMany({

                skip: desde,

                take: hasta,

                orderBy: {
                    precio: orden
                }

            })

        res.json(productos)

    } catch (error: any) {

        res.status(500).json({
            error: error.message
        })

    }

})

// GET producto por id
router.get("/productos/:id", async (req, res) => {

    try {

        const id =
            Number(req.params.id)

        const producto =
            await prisma.producto.findUnique({

                where: { id }

            })

        if (!producto) {

            return res.status(404).json({
                error: "Producto no encontrado"
            })

        }

        res.json(producto)

    } catch (error: any) {

        res.status(500).json({
            error: error.message
        })

    }

})

// POST crear producto
router.post("/productos", async (req, res) => {

    try {

        const producto =
            await prisma.producto.create({

                data: req.body

            })

        res.status(201).json(producto)

    } catch (error: any) {

        res.status(500).json({
            error: error.message
        })

    }

})

// PUT actualizar producto
router.put("/productos/:id", async (req, res) => {

    try {

        const id =
            Number(req.params.id)

        const producto =
            await prisma.producto.update({

                where: { id },

                data: req.body

            })

        res.json(producto)

    } catch (error: any) {

        res.status(500).json({
            error: error.message
        })

    }

})

// DELETE producto
router.delete("/productos/:id", async (req, res) => {

    try {

        const id =
            Number(req.params.id)

        await prisma.producto.delete({

            where: { id }

        })

        res.json({
            message: "Producto eliminado"
        })

    } catch (error: any) {

        res.status(500).json({
            error: error.message
        })

    }

})

export default router