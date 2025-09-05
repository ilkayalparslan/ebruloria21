import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Hotel1 from "../pageComponents/Hotel1";

function Hotels() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hotel1 />
      <Footer />
    </div>
  );
}

export default Hotels;
