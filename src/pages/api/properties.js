import axios from "axios";
import dedemanData from "../../data/dedeman.json";
// Import other properties...

export default async function handler(req, res) {
  try {
    // Get client IP
    const clientIP =
      req.headers["x-forwarded-for"] ||
      req.headers["x-real-ip"] ||
      req.connection.remoteAddress;

    // Get country from IP
    let userCountry = "UNKNOWN";
    try {
      const geoResponse = await axios.get(`https://ipapi.co/${clientIP}/json/`);
      userCountry = geoResponse.data.country_code;
    } catch (error) {
      console.warn("Geolocation failed:", error);
    }

    // Your properties array
    const allProperties = [dedemanData /* , other properties... */];

    // Filter based on user location
    const filteredProperties = allProperties.filter((property) => {
      if (userCountry === "TR" && property.isAvailableInTurkey === false) {
        return false;
      }
      return true;
    });

    res.status(200).json({
      properties: filteredProperties,
      userCountry,
      debug:
        process.env.NODE_ENV === "development"
          ? {
              clientIP,
              totalProperties: allProperties.length,
              filteredCount: filteredProperties.length,
            }
          : undefined,
    });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Failed to fetch properties" });
  }
}
