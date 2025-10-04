import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { usePropertyFilter } from "../hooks/usePropertyFilter";
import dedemanData from "../data/dedeman.json";

const Homes = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Add property data - you can add more properties here
  const allProperties = [dedemanData];

  // Use the property filter hook
  const {
    filteredProperties,
    isLoading: locationLoading,
    userCountry,
  } = usePropertyFilter(allProperties);

  useEffect(() => {
    // Fade in animation on mount
    setIsVisible(true);

    // Simulate progress animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 85) return 85;
        return prev + Math.random() * 2;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const handleGoHome = () => {
    navigate("/");
  };

  // Show loading if still detecting location
  if (locationLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Detecting your location...</p>
          <p className="text-sm opacity-75 mt-2">
            Preparing personalized content
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 overflow-hidden transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-48 h-48 bg-white/10 rounded-full backdrop-blur-md top-[10%] -left-5 animate-[float_6s_ease-in-out_infinite]"></div>
        <div className="absolute w-36 h-36 bg-white/10 rounded-full backdrop-blur-md top-[70%] -right-10 animate-[float_8s_ease-in-out_infinite_reverse]"></div>
        <div className="absolute w-24 h-24 bg-white/10 rounded-full backdrop-blur-md top-[30%] right-[10%] animate-[float_5s_ease-in-out_infinite]"></div>
      </div>

      <div className="text-center z-10 relative max-w-2xl p-8 bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.1)] mx-4">
        {/* Main logo/brand area */}
        <div className="relative mb-8">
          <div className="w-28 h-28 border-2 border-white/30 rounded-full mx-auto animate-[pulse_2s_ease-in-out_infinite] flex items-center justify-center">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                className="animate-[rotate_8s_linear_infinite] drop-shadow-lg"
              >
                <path d="M30 5L45 20L30 35L15 20Z" fill="url(#gradient1)" />
                <path
                  d="M30 25L45 40L30 55L15 40Z"
                  fill="url(#gradient2)"
                  opacity="0.7"
                />
                <defs>
                  <linearGradient
                    id="gradient1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="100%" stopColor="#764ba2" />
                  </linearGradient>
                  <linearGradient
                    id="gradient2"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#f093fb" />
                    <stop offset="100%" stopColor="#f5576c" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Main message */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent animate-[titleGlow_3s_ease-in-out_infinite_alternate]">
            Something Amazing is Coming
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-4 font-normal">
            We are working to make your experience better with us
          </p>
          <p className="text-base text-white/70 leading-relaxed max-w-md mx-auto">
            Our team is crafting something special just for you. Stay tuned for
            an incredible experience.
          </p>

          {/* Add location-aware message */}
          {userCountry && (
            <div className="mt-4 text-sm text-white/60">
              <p>🌍 Personalized content for your region</p>
              <p className="text-xs mt-1">
                {filteredProperties.length} properties available in your area
              </p>
            </div>
          )}
        </div>

        {/* Progress section */}
        <div className="mb-8">
          <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-300 relative after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/40 after:to-transparent after:animate-[shimmer_2s_infinite]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-white/80 text-sm font-medium">
            {Math.round(progress)}% Complete
          </span>
        </div>

        {/* Loading spinner */}
        <div className="mb-8">
          <div className="w-14 h-14 mx-auto relative">
            <div className="w-full h-full border-2 border-transparent border-t-white/60 rounded-full absolute animate-[spin_1.5s_linear_infinite]"></div>
            <div className="w-4/5 h-4/5 border-2 border-transparent border-t-white/40 rounded-full absolute top-[10%] left-[10%] animate-[spin_2s_linear_infinite_reverse]"></div>
            <div className="w-3/5 h-3/5 border-2 border-transparent border-t-white/20 rounded-full absolute top-[20%] left-[20%] animate-[spin_3s_linear_infinite]"></div>
          </div>
        </div>

        {/* Call to action */}
        <div>
          <button
            onClick={handleGoHome}
            className="bg-gradient-to-r from-white/20 to-white/10 border border-white/30 text-white px-8 py-4 rounded-full font-semibold backdrop-blur-md flex items-center gap-2 mx-auto transition-all duration-300 hover:from-white/30 hover:to-white/20 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)]"
          >
            <FiHome size={20} />
            <span>Go Back Home</span>
          </button>
        </div>

        {/* Debug info in development */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 p-4 bg-black/20 rounded-lg text-left">
            <h4 className="text-white font-semibold mb-2">Debug Info:</h4>
            <p className="text-white/70 text-sm">User Country: {userCountry}</p>
            <p className="text-white/70 text-sm">
              Total Properties: {allProperties.length}
            </p>
            <p className="text-white/70 text-sm">
              Filtered Properties: {filteredProperties.length}
            </p>
            <p className="text-white/70 text-sm">
              Hidden Properties:{" "}
              {allProperties
                .filter((p) => !filteredProperties.includes(p))
                .map((p) => p.name)
                .join(", ") || "None"}
            </p>
          </div>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[slideRight_4s_ease-in-out_infinite]"></div>
        <div className="absolute top-[50%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[slideLeft_5s_ease-in-out_infinite]"></div>
        <div className="absolute top-[80%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[slideRight_6s_ease-in-out_infinite]"></div>
      </div>

      {/* Custom keyframes - add to your global CSS or tailwind.config.js */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.1);
          }
        }
        @keyframes titleGlow {
          0% {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
          }
          100% {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes slideRight {
          0%,
          100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
        }
        @keyframes slideLeft {
          0%,
          100% {
            transform: translateX(100%);
          }
          50% {
            transform: translateX(-100%);
          }
        }
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Homes;
