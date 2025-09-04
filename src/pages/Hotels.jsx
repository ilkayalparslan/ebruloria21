import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Hotel1 from "../pageComponents/Hotel1";

function Hotels() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Main content */}
      <main>
        <Hotel1 />
      </main>

      <Footer />
    </div>
  );
}

export default Hotels;
