import React, { useState, useEffect } from "react";
import { useTranslation } from "../data/translations";

// Import home images
import pic8 from "../assets/images/home/pic-8.jpg";
import pic9 from "../assets/images/home/pic-9.jpg";
import pic10 from "../assets/images/home/pic-10.jpg";
import pic11 from "../assets/images/home/pic-11.jpg";
import pic12 from "../assets/images/home/pic-12.jpg";

function Home4() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const PORTFOLIO_ITEMS = [
    {
      id: 1,
      title: t("modernLivingSpaces"),
      image: pic8,
      description: t("modernLivingDesc"),
    },
    {
      id: 2,
      title: t("luxuryInteriors"),
      image: pic9,
      description: t("luxuryInteriorsDesc"),
    },
    {
      id: 3,
      title: t("urbanArchitecture"),
      image: pic10,
      description: t("urbanArchitectureDesc"),
    },
    {
      id: 4,
      title: t("scenicProperties"),
      image: pic11,
      description: t("scenicPropertiesDesc"),
    },
    {
      id: 5,
      title: t("smartHomes"),
      image: pic12,
      description: t("smartHomesDesc"),
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PORTFOLIO_ITEMS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, PORTFOLIO_ITEMS.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % PORTFOLIO_ITEMS.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setActiveIndex(
      (prev) => (prev - 1 + PORTFOLIO_ITEMS.length) % PORTFOLIO_ITEMS.length
    );
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0">
        {PORTFOLIO_ITEMS.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover scale-105 animate-ken-burns"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-dark/80 via-primary-dark/70 to-dark/90"></div>
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-inter">
              {t("explorePortfolioTitle")}{" "}
              <span className="text-primary-light bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">
                {t("portfolioHighlight")}
              </span>
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto font-inter leading-relaxed">
              {t("portfolioSubtitle")}
            </p>
          </div>

          {/* Current Slide Info */}
          <div className="text-center mb-12">
            <div className="inline-block bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md mx-auto transform transition-all duration-500">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-inter">
                {PORTFOLIO_ITEMS[activeIndex].title}
              </h3>
              <p className="text-white/80 font-inter text-lg">
                {PORTFOLIO_ITEMS[activeIndex].description}
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-8 mb-16">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="group w-14 h-14 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <svg
                className="w-6 h-6 text-white transform group-hover:-translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Slide Indicators */}
            <div className="flex gap-3">
              {PORTFOLIO_ITEMS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    activeIndex === index
                      ? "w-12 h-3 bg-primary-light"
                      : "w-3 h-3 bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="group w-14 h-14 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <svg
                className="w-6 h-6 text-white transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <button className="group flex items-center gap-3 text-white hover:text-primary-light transition-all duration-300 text-lg font-medium bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full backdrop-blur-sm">
              <span className="relative">{t("viewAllProperties")}</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
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
            </button>
            <button className="group flex items-center gap-3 text-white hover:text-accent transition-all duration-300 text-lg font-medium bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full backdrop-blur-sm">
              <span className="relative">{t("contactAgent")}</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
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
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary-light/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </section>
  );
}

export default Home4;
