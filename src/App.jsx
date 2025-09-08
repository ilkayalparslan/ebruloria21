import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./data/languageContext";
import Home from "./pages/Home.jsx";
import Hotels from "./pages/Hotels";
import Homes from "./pages/Homes";
import HotelDetails from "./pages/HotelDetails.jsx";
import SellForm from "./pages/SellForm.jsx";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:adNumber" element={<HotelDetails />} />
          <Route path="/homes" element={<Homes />} />
          <Route path="/sell-property" element={<SellForm />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
