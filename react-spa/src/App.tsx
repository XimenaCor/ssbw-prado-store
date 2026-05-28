import {

  BrowserRouter,

  Routes,

  Route,

  Link

} from "react-router-dom"

import Home from "./pages/Home"

import Gallery from "./pages/Gallery"

import CarouselPage from "./pages/CarouselPage"

function App() {

  return (

    <BrowserRouter>

      <div className="min-h-screen">

        <div className="tabs tabs-boxed flex justify-center mt-4">

          <Link
            to="/"
            className="tab"
          >
            Inicio
          </Link>

          <Link
            to="/gallery"
            className="tab"
          >
            Tarea 9
          </Link>

          <Link
            to="/carousel"
            className="tab"
          >
            Carousel
          </Link>

        </div>

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/gallery"
            element={<Gallery />}
          />

          <Route
            path="/carousel"
            element={<CarouselPage />}
          />

        </Routes>

      </div>

    </BrowserRouter>

  )

}

export default App
