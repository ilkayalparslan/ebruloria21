import React from "react";
import { FaPhone, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

const FloatingButtons = () => {
  return (
    <>
      {/* Vertical Fixed Position Buttons - Desktop Only */}
      <div className="hidden md:flex fixed top-52 -right-10 z-50 flex-col gap-36">
        <div className="flex items-center bg-black/70 text-white px-5 py-3 rounded-full cursor-pointer text-sm font-medium transition-all duration-200 shadow-lg gap-2 rotate-90 origin-center whitespace-nowrap hover:bg-black/80">
          <FaPhone className="text-lg" />
          <span>Request a Call</span>
        </div>
        <div className="flex items-center bg-black/70 text-white px-5 py-3 rounded-full cursor-pointer text-sm font-medium transition-all duration-200 shadow-lg gap-2 rotate-90 origin-center whitespace-nowrap hover:bg-black/80">
          <FaMapMarkerAlt className="text-lg" />
          <span>EbruLoria Online</span>
        </div>
      </div>

      {/* WhatsApp Chat Button - Always visible */}
      <div className="fixed bottom-20 right-5 z-50 cursor-pointer">
        <div className="relative w-16 h-16">
          {/* Ripple animation circles */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-green-400/70 animate-ping"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-green-400/50 animate-pulse"></div>

          {/* Main WhatsApp button */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 relative z-10">
            <FaWhatsapp className="text-white text-4xl" />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Buttons - Mobile Only */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex">
        <div className="w-1/2 flex items-center justify-between bg-black/90 text-white px-6 py-4 cursor-pointer text-sm font-medium transition-all duration-200 shadow-lg hover:bg-black">
          <span>Request a Call</span>
          <FaPhone className="text-lg" />
        </div>
        <div className="w-1/2 flex items-center justify-between bg-black/50 text-white px-6 py-4 cursor-pointer text-sm font-medium transition-all duration-200 shadow-lg hover:bg-black/70">
          <span>EbruLoria Online</span>
          <FaMapMarkerAlt className="text-lg" />
        </div>
      </div>
    </>
  );
};

export default FloatingButtons;
