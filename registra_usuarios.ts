import prisma from "./prisma/prisma.client.ts"

import {
    hashPassword,
    verifyPassword
} from "./utils/auth.ts"

async function main() {

    const passwordHash =
        await hashPassword("123456")

    const usuario =
        await prisma.usuario.create({

            data: {

                email: "admin@test.com",

                nombre: "Admin",

                contrasena: passwordHash,

                admin: true

            }

        })

    console.log("Usuario creado:")
    console.log(usuario)

    const passwordOk =
        await verifyPassword(
            "123456",
            usuario.contrasena
        )

    console.log(
        "Password correcta:",
        passwordOk
    )

}

main()