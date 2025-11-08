import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import NavBar from "./component/Navbar";
import Footer from "./component/Footer";
import Home from "./component/Home";
import CarListingPage from "./component/CarListingPage";
import CarDetailPage from "./component/CarDetailPage";
import Contact from "./component/Contact";
import About from "./component/About";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="/cars/:brandName" element={<CarListingPage />} />
        <Route path="/cars/:brandName/:modelName" element={<CarDetailPage />} />
        <Route path="/countries/:countryName" element={<CarListingPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
