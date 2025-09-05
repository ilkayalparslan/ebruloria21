import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home.jsx";
import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:adNumber" element={<HotelDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
