import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"

function Carousel() {

    const slides = [

        {
            titulo: "Libro 1",
            imagen:
                "https://placehold.co/400x400?text=Libro+1"
        },

        {
            titulo: "Libro 2",
            imagen:
                "https://placehold.co/400x400?text=Libro+2"
        },

        {
            titulo: "Libro 3",
            imagen:
                "https://placehold.co/400x400?text=Libro+3"
        }

    ]

    return (

        <div className="w-[500px]">

            <Swiper
                spaceBetween={20}
                slidesPerView={1}
            >

                {slides.map((slide, index) => (

                    <SwiperSlide key={index}>

                        <div className="flex flex-col items-center gap-4 p-4">

                            <img
                                src={slide.imagen}
                                className="rounded-2xl shadow-xl"
                            />

                            <h2 className="text-2xl font-bold">

                                {slide.titulo}

                            </h2>

                        </div>

                    </SwiperSlide>

                ))}

            </Swiper>

        </div>

    )

}

export default Carousel
