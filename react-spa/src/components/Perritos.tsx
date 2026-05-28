import { useEffect, useState } from "react"

function Perritos() {

    const [imagen, setImagen] =
        useState("")

    async function cargarPerrito() {

        const response =
            await fetch(
                "https://dog.ceo/api/breeds/image/random"
            )

        const data =
            await response.json()

        setImagen(data.message)

    }

    useEffect(() => {

        cargarPerrito()

    }, [])

    return (

        <div className="flex flex-col items-center gap-4">

            <h2 className="text-3xl font-bold">

                Perrito random 🐶

            </h2>

            <img
                src={imagen}
                className="w-80 h-80 object-cover rounded-2xl shadow-xl"
            />

            <button
                onClick={cargarPerrito}
                className="bg-black text-white px-4 py-2 rounded-xl cursor-pointer"
            >
                Otro perrito
            </button>

        </div>

    )

}

export default Perritos
