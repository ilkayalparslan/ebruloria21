import { useEffect, useRef, useState } from "react";

// Import all home images
import pic1 from "../assets/images/home/pic-1.jpg";
import pic2 from "../assets/images/home/pic-2.jpg";
import pic3 from "../assets/images/home/pic-3.jpg";
import pic4 from "../assets/images/home/pic-4.jpg";
import pic5 from "../assets/images/home/pic-5.jpg";

function Home1() {
  const isMobile = window.innerWidth <= 768;
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const totalSlides = 5;

  useEffect(() => {
    if (!isMobile) return;

    let autoScrollTimer;

    const startAutoScroll = () => {
      clearInterval(autoScrollTimer);
      autoScrollTimer = setInterval(() => {
        if (!isDragging) {
          setCurrentSlide((prev) => {
            const nextSlide = (prev + 1) % totalSlides;
            if (sliderRef.current) {
              sliderRef.current.style.transform = `translateX(${
                nextSlide * -window.innerWidth
              }px)`;
            }
            return nextSlide;
          });
        }
      }, 4000);
    };

    const handleTouchStart = (e) => {
      clearInterval(autoScrollTimer);
      setIsDragging(true);
      setStartPos(e.touches[0].clientX);
      setPrevTranslate(currentSlide * -window.innerWidth);
      setCurrentTranslate(currentSlide * -window.innerWidth);
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const currentPosition = e.touches[0].clientX;
      const diff = currentPosition - startPos;
      const newTranslate = prevTranslate + diff;

      // Limit the movement to not go beyond boundaries
      const maxTranslate = 0;
      const minTranslate = -(totalSlides - 1) * window.innerWidth;
      const boundedTranslate = Math.max(
        minTranslate,
        Math.min(maxTranslate, newTranslate)
      );

      setCurrentTranslate(boundedTranslate);
      if (sliderRef.current) {
        sliderRef.current.style.transform = `translateX(${boundedTranslate}px)`;
      }
    };

    const handleTouchEnd = () => {
      if (!isDragging) return;
      setIsDragging(false);

      const movedBy = currentTranslate - prevTranslate;
      let newIndex = currentSlide;

      if (movedBy < -50 && currentSlide < totalSlides - 1) {
        newIndex = currentSlide + 1;
      } else if (movedBy > 50 && currentSlide > 0) {
        newIndex = currentSlide - 1;
      }

      setCurrentSlide(newIndex);
      const finalTranslate = newIndex * -window.innerWidth;
      if (sliderRef.current) {
        sliderRef.current.style.transform = `translateX(${finalTranslate}px)`;
      }
      setCurrentTranslate(finalTranslate);
      setPrevTranslate(finalTranslate);

      setTimeout(() => {
        startAutoScroll();
      }, 2000);
    };

    startAutoScroll();

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("touchstart", handleTouchStart);
      slider.addEventListener("touchmove", handleTouchMove);
      slider.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      clearInterval(autoScrollTimer);
      if (slider) {
        slider.removeEventListener("touchstart", handleTouchStart);
        slider.removeEventListener("touchmove", handleTouchMove);
        slider.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [
    currentSlide,
    isDragging,
    currentTranslate,
    prevTranslate,
    startPos,
    isMobile,
  ]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        minHeight: "100vh",
        padding: isMobile ? "0" : "40px 60px",
        gap: isMobile ? "0" : "60px",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#f8f9fa",
      }}
    >
      {isMobile ? (
        <div className="relative w-screen h-screen overflow-hidden">
          <div
            ref={sliderRef}
            className="flex h-full cursor-grab active:cursor-grabbing"
            style={{
              width: `${totalSlides * 100}vw`,
              transition: isDragging ? "none" : "transform 0.3s ease-out",
            }}
          >
            {/* Slide 1 */}
            <div
              className="w-screen h-full relative bg-cover bg-center flex-shrink-0"
              style={{
                backgroundImage: `url(${pic1})`,
              }}
            >
              <div className="absolute inset-0 bg-blue-500 bg-opacity-30 flex flex-col justify-center items-center px-8 py-20 text-center">
                <h1 className="text-3xl font-bold leading-tight text-white mb-5 font-inter max-w-sm">
                  We're changing the way people connect
                </h1>
                <p className="text-base leading-relaxed text-white text-opacity-90 font-inter max-w-xs">
                  Cupidatat minim id magna ipsum sint dolor qui. Sunt sit in
                  quis cupidatat mollit aute velit.
                </p>
              </div>
            </div>

            {/* Slide 2 */}
            <div
              className="w-screen h-full relative bg-cover bg-center flex-shrink-0"
              style={{
                backgroundImage: `url(${pic2})`,
              }}
            >
              <div className="absolute inset-0 bg-red-500 bg-opacity-25 flex flex-col justify-center items-center px-8 py-20 text-center">
                <h1 className="text-3xl font-bold leading-tight text-white mb-5 font-inter max-w-sm">
                  We're changing the way people connect
                </h1>
                <p className="text-base leading-relaxed text-white text-opacity-90 font-inter max-w-xs">
                  Cupidatat minim id magna ipsum sint dolor qui. Sunt sit in
                  quis cupidatat mollit aute velit.
                </p>
              </div>
            </div>

            {/* Slide 3 */}
            <div
              className="w-screen h-full relative bg-cover bg-center flex-shrink-0"
              style={{
                backgroundImage: `url(${pic3})`,
              }}
            >
              <div className="absolute inset-0 bg-green-500 bg-opacity-35 flex flex-col justify-center items-center px-8 py-20 text-center">
                <h1 className="text-3xl font-bold leading-tight text-white mb-5 font-inter max-w-sm">
                  We're changing the way people connect
                </h1>
                <p className="text-base leading-relaxed text-white text-opacity-90 font-inter max-w-xs">
                  Cupidatat minim id magna ipsum sint dolor qui. Sunt sit in
                  quis cupidatat mollit aute velit.
                </p>
              </div>
            </div>

            {/* Slide 4 */}
            <div
              className="w-screen h-full relative bg-cover bg-center flex-shrink-0"
              style={{
                backgroundImage: `url(${pic4})`,
              }}
            >
              <div className="absolute inset-0 bg-yellow-400 bg-opacity-40 flex flex-col justify-center items-center px-8 py-20 text-center">
                <h1 className="text-3xl font-bold leading-tight text-white mb-5 font-inter max-w-sm">
                  We're changing the way people connect
                </h1>
                <p className="text-base leading-relaxed text-white text-opacity-90 font-inter max-w-xs">
                  Cupidatat minim id magna ipsum sint dolor qui. Sunt sit in
                  quis cupidatat mollit aute velit.
                </p>
              </div>
            </div>

            {/* Slide 5 */}
            <div
              className="w-screen h-full relative bg-cover bg-center flex-shrink-0"
              style={{
                backgroundImage: `url(${pic5})`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(75, 85, 99, 0.5)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "60px 30px 80px",
                  textAlign: "center",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              >
                <h1 className="text-3xl font-bold leading-tight text-white mb-5 font-inter max-w-sm">
                  We're changing the way people connect
                </h1>
                <p className="text-base leading-relaxed text-white text-opacity-90 font-inter max-w-xs">
                  Cupidatat minim id magna ipsum sint dolor qui. Sunt sit in
                  quis cupidatat mollit aute velit.
                </p>
              </div>
            </div>
          </div>

          {/* Slide indicators */}
          <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "bg-white" : "bg-white bg-opacity-50"
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Desktop: Original layout restored */}
          <div
            style={{
              flex: 1,
              maxWidth: "500px",
              zIndex: 2,
            }}
          >
            <h1 className="text-5xl font-bold leading-tight text-gray-800 mb-6 font-inter">
              We're changing the way people connect
            </h1>
            <p className="text-base leading-relaxed text-gray-600 mb-8 font-inter">
              Cupidatat minim id magna ipsum sint dolor qui. Sunt sit in quis
              cupidatat mollit aute velit. Et labore commodo nulla aliqua
              proident mollit ullamco exercitation tempor. Sint aliqua anim
              nulla sunt mollit id pariatur in voluptate cillum. Eu voluptate
              tempor esse minim amet fugiat veniam occaecat aliqua.
            </p>
            <div className="flex gap-4">
              <button className="bg-blue-500 text-white border-none px-6 py-3 rounded-md text-base font-medium cursor-pointer font-inter hover:bg-blue-600 transition-colors">
                Get Started
              </button>
              <button className="bg-transparent text-blue-500 border-2 border-blue-500 px-6 py-3 rounded-md text-base font-medium cursor-pointer font-inter hover:bg-blue-50 transition-colors">
                Live Demo →
              </button>
            </div>
          </div>

          {/* Right image grid section - Original design restored */}
          <div
            style={{
              flex: 1,
              maxWidth: "550px",
              minWidth: "320px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexDirection: "row",
              }}
            >
              {/* First column - 1 image */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "175px",
                  gap: "12px",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "260px",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={pic1}
                    alt="Team meeting"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(59, 130, 246, 0.3)", // Original blue overlay
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </div>

              {/* Second column - 2 images */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "175px",
                  gap: "12px",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "260px",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={pic2}
                    alt="Woman working"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(239, 68, 68, 0.25)", // Original red overlay
                      pointerEvents: "none",
                    }}
                  />
                </div>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "260px",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={pic3}
                    alt="Office space"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(34, 197, 94, 0.35)", // Original green overlay
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </div>

              {/* Third column - 2 images */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "175px",
                  gap: "12px",
                  marginTop: "-5rem",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "260px",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={pic4}
                    alt="Person with phone"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(250, 204, 21, 0.4)", // Original yellow overlay
                      pointerEvents: "none",
                    }}
                  />
                </div>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "260px",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={pic5}
                    alt="Collaborative workspace"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(75, 85, 99, 0.5)", // Darker and more opaque gray overlay
                      pointerEvents: "none",
                      zIndex: 1,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home1;
