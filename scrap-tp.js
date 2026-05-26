import fs from "fs"
import { chromium } from "playwright"

const browser = await chromium.launch({
    headless: false
})

const context = await browser.newContext({
    userAgent:
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36"
})

const page = await context.newPage()

try {

    await page.goto(
        "https://books.toscrape.com",
        { timeout: 10000 }
    )

    console.log("Página cargada correctamente")

    await page.waitForTimeout(2000)

    // Obtener productos
    const productosLocator = page.locator('.product_pod')

    const productos = []

    for (const producto of await productosLocator.all()) {

        // Título
        const titulo = await producto.locator('h3 a').getAttribute('title')

        // Precio
        const precio = await producto.locator('.price_color').textContent()

        // Imagen
        const imagen = await producto.locator('img').getAttribute('src')

        productos.push({
            titulo,
            precio,
            imagen
        })
    }

    console.log("Productos encontrados:", productos.length)

    console.log(productos)
    fs.writeFileSync(
        "productos.json",
        JSON.stringify(productos, null, 2)
    )

    console.log("productos.json generado correctamente")

} catch (error) {

    console.error("Error:", error)

}

await browser.close()