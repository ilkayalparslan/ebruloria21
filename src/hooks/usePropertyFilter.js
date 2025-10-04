import { useState, useEffect } from "react";
import { isUserInTurkey } from "../utils/geolocation";

export const usePropertyFilter = (properties) => {
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userCountry, setUserCountry] = useState(null);

  useEffect(() => {
    const filterProperties = async () => {
      try {
        setIsLoading(true);
        const isInTurkey = await isUserInTurkey();
        setUserCountry(isInTurkey ? "TR" : "OTHER");

        const filtered = properties.filter((property) => {
          // If user is in Turkey and property is not available in Turkey, hide it
          if (isInTurkey && property.isAvailableInTurkey === false) {
            return false;
          }

          // Show all other properties
          return true;
        });

        setFilteredProperties(filtered);
      } catch (error) {
        console.error("Error filtering properties:", error);
        // On error, show all properties except those explicitly unavailable in Turkey
        const filtered = properties.filter(
          (property) => property.isAvailableInTurkey !== false
        );
        setFilteredProperties(filtered);
      } finally {
        setIsLoading(false);
      }
    };

    if (properties && properties.length > 0) {
      filterProperties();
    }
  }, [properties]);

  return {
    filteredProperties,
    isLoading,
    userCountry,
  };
};
