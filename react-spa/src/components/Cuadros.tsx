import useSWR from "swr"

const fetcher = (url: string) =>
    fetch(url).then(res => res.json())

function Cuadros() {

    const url =
        "http://localhost:3000/api/random-image"

    const {
        data,
        error,
        isLoading,
        mutate
    } = useSWR(url, fetcher)

    if (isLoading) {

        return <p>Cargando...</p>

    }

    if (error) {

        return <p>Error cargando imagen</p>

    }

    return (

        <div className="flex flex-col items-center gap-4">

            <h2 className="text-3xl font-bold">

                Libro random 📚

            </h2>

            <img
                src="https://placehold.co/400x400?text=Libro"
                className="w-80 h-80 object-cover rounded-2xl shadow-xl"
            />

            <h3 className="text-xl font-bold text-center">

                {data.titulo}

            </h3>

            <button
                onClick={() => mutate()}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl cursor-pointer"
            >
                Otro libro
            </button>

        </div>

    )

}

export default Cuadros
