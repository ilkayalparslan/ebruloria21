function Home1() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: window.innerWidth <= 768 ? "column" : "row",
        minHeight: "100vh",
        padding: "40px 60px",
        gap: "60px",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#f8f9fa",
      }}
    >
      {/* Left content section */}
      <div
        style={{
          flex: 1,
          maxWidth: window.innerWidth <= 768 ? "100%" : "500px",
          zIndex: 2,
        }}
      >
        <h1
          style={{
            fontSize: window.innerWidth <= 768 ? "36px" : "48px",
            fontWeight: "bold",
            lineHeight: "1.2",
            color: "#2c3e50",
            marginBottom: "24px",
            fontFamily:
              "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          }}
        >
          We're changing the way people connect
        </h1>
        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            color: "#6c757d",
            marginBottom: "32px",
            fontFamily:
              "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          }}
        >
          Cupidatat minim id magna ipsum sint dolor qui. Sunt sit in quis
          cupidatat mollit aute velit. Et labore commodo nulla aliqua proident
          mollit ullamco exercitation tempor. Sint aliqua anim nulla sunt mollit
          id pariatur in voluptate cillum. Eu voluptate tempor esse minim amet
          fugiat veniam occaecat aliqua.
        </p>
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexDirection: window.innerWidth <= 768 ? "column" : "row",
          }}
        >
          <button
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
              fontFamily:
                "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Get Started
          </button>
          <button
            style={{
              backgroundColor: "transparent",
              color: "#007bff",
              border: "2px solid #007bff",
              padding: "12px 24px",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
              fontFamily:
                "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Live Demo →
          </button>
        </div>
      </div>

      {/* Right image grid section */}
      <div
        style={{
          flex: 1,
          maxWidth: window.innerWidth <= 768 ? "100%" : "550px",
          minWidth: "320px",
          marginTop: window.innerWidth <= 768 ? "40px" : "0",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexDirection: window.innerWidth <= 768 ? "column" : "row",
          }}
        >
          {/* First column - 1 image */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: window.innerWidth <= 768 ? "100%" : "175px",
              gap: "12px",
              justifyContent: "center",
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
                src="src/images/home/pic-1.jpg"
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
                  backgroundColor: "rgba(0, 123, 255, 0.3)", // Blue overlay with 30% opacity
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
              width: window.innerWidth <= 768 ? "100%" : "175px",
              gap: "12px",
              justifyContent: "center",
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
                src="src/images/home/pic-2.jpg"
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
                  backgroundColor: "rgba(220, 53, 69, 0.25)", // Red overlay with 25% opacity
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
                src="src/images/home/pic-3.jpg"
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
                  backgroundColor: "rgba(40, 167, 69, 0.35)", // Green overlay with 35% opacity
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
              width: window.innerWidth <= 768 ? "280px" : "175px",
              gap: "12px",
              marginTop: window.innerWidth <= 768 ? "0" : "-5rem",
              flexShrink: 0,
              scrollSnapAlign: window.innerWidth <= 768 ? "start" : "none",
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
                src="src/images/home/pic-4.jpg"
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
                  backgroundColor: "rgba(255, 193, 7, 0.4)", // Yellow overlay with 40% opacity
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
                src="src/images/home/pic-5.jpg"
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
                  backgroundColor: "rgba(108, 117, 125, 0.3)", // Gray overlay with 30% opacity
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home1;
