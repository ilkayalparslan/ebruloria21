import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../data/translations";

function Home2() {
  const { t } = useTranslation();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/video-1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full px-6 md:px-12">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8 font-inter">
            {t("home2Title")}{" "}
            <span className="text-primary-light">
              {t("home2TitleHighlight")}
            </span>
            {t("home2TitleEnd")}
          </h1>

          {/* Our Team Button */}
          <Link
            to="/ourteam"
            className="group relative inline-flex items-center justify-center px-8 py-4 md:px-12 md:py-5 bg-transparent border-2 border-white text-white font-medium text-lg md:text-xl rounded-full hover:bg-white hover:text-dark transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              {t("ourTeam")}
              <svg
                className="w-5 h-5 md:w-6 md:h-6 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>

            {/* Button hover effect */}
            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-8 left-8 hidden md:block">
        <div className="w-16 h-px bg-primary-light mb-4"></div>
        <p className="text-white text-sm font-medium tracking-wider">
          {t("since2010")}
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
        <div className="flex flex-col items-center text-white">
          <span className="text-xs font-medium tracking-wider mb-3">
            {t("scroll")}
          </span>
          <div className="w-px h-12 bg-white opacity-50"></div>
        </div>
      </div>
    </div>
  );
}

export default Home2;
