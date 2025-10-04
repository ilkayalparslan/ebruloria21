import React, { useState, useEffect } from "react";
import { usePropertyFilter } from "../hooks/usePropertyFilter";
import dedemanData from "../data/dedeman.json";
// Import other property data files...

const PropertyList = () => {
  const [allProperties, setAllProperties] = useState([]);

  useEffect(() => {
    // Load all your property data
    const properties = [
      dedemanData,
      // Add other property data here...
    ];
    setAllProperties(properties);
  }, []);

  const { filteredProperties, isLoading, userCountry } =
    usePropertyFilter(allProperties);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-lg">Loading properties...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Optional: Show debug info in development */}
      {process.env.NODE_ENV === "development" && (
        <div className="mb-4 p-4 bg-gray-100 rounded">
          <p>User Country: {userCountry}</p>
          <p>Total Properties: {allProperties.length}</p>
          <p>Filtered Properties: {filteredProperties.length}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">
                {property.translations.en.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {property.location}, {property.city}, {property.country}
              </p>
              <div className="flex justify-between items-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    property.tier === "gold"
                      ? "bg-yellow-100 text-yellow-800"
                      : property.tier === "silver"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-bronze-100 text-bronze-800"
                  }`}
                >
                  {property.tier}
                </span>
                <span className="text-sm text-gray-500">
                  {property.roomNumber} rooms
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">
            No properties available in your region.
          </p>
        </div>
      )}
    </div>
  );
};

export default PropertyList;
