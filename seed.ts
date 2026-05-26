import prisma from "./prisma/prisma.client.ts"

import productos from "./productos.json" with { type: "json" }

for (const producto of productos) {

    const titulo = producto.titulo

    const descripcion = "Libro geek de colección"

    const imagen = producto.imagen

    const precio = Number(
        producto.precio.replace("£", "")
    )

    try {

        const nuevoProducto = await prisma.producto.create({
            data: {
                titulo,
                descripcion,
                imagen,
                precio
            }
        })

        console.log("Creado:", nuevoProducto.titulo)

    } catch (error) {

        console.error(error)

    }

}

await prisma.$disconnect()