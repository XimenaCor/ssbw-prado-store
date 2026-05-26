import express from "express"

import jwt from "jsonwebtoken"

import prisma from "../prisma/prisma.client.ts"

import logger from "../logger.ts"

import {
    verifyPassword
} from "../utils/auth.ts"

const router = express.Router()

router.get("/login", (req, res) => {

    res.render("login.njk", {
        error: false
    })

})

router.post("/login", async (req, res) => {

    const {
        email,
        contrasena
    } = req.body

    try {

        const usuario =
            await prisma.usuario.findUnique({

                where: {
                    email
                }

            })

        if (!usuario) {

            throw new Error(
                "Usuario no encontrado"
            )

        }

        const passwordOk =
            await verifyPassword(
                contrasena,
                usuario.contrasena
            )

        if (!passwordOk) {

            throw new Error(
                "Password incorrecta"
            )

        }

        const token = jwt.sign({

            usuario: usuario.nombre,

            admin: usuario.admin

        },
            process.env.SECRET_KEY as string)

        res.cookie(
            "access_token",
            token,
            {
                httpOnly: true,
                secure: false
            }
        )

        logger.info(
            `Usuario autenticado: ${usuario.nombre}`
        )

        res.redirect("/")

    } catch (error: any) {

        logger.error(error.message)

        res.render("login.njk", {
            error: true
        })

    }

})

router.get("/logout", (req, res) => {

    res.clearCookie("access_token")

    res.redirect("/")

})

export default router