import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type Producto = {
    titulo: string;
    precio: string;
    imagen: string;
};

type Props = {
    productos: Producto[];
};

function CarrouselSSG({ productos }: Props) {
    return (
        <div className="w-[500px]">
            <Swiper
                spaceBetween={20}
                slidesPerView={1}
            >
                {productos.map((producto) => (
                    <SwiperSlide key={producto.titulo}>
                        <div className="flex flex-col items-center gap-4 p-4">

                            {/* Placeholder mientras no tengamos las imágenes reales */}
                            <img
                                src="https://placehold.co/400x400?text=Libro"
                                alt={producto.titulo}
                                className="rounded-2xl shadow-xl"
                            />

                            <h2 className="text-2xl font-bold text-center">
                                {producto.titulo}
                            </h2>

                            <p className="text-lg">
                                {producto.precio}
                            </p>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default CarrouselSSG;
