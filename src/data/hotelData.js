// Import all images with correct filenames
import hotel1 from "../assets/images/hotels/arach-1.jpg";
import hotel2 from "../assets/images/hotels/gulsultan-1.jpg";
import hotel3 from "../assets/images/hotels/hermanos-1.jpg";
import hotel4 from "../assets/images/hotels/mardia-1.jpg";
import hotel5 from "../assets/images/hotels/newhotel-1.jpg";
import hotel6 from "../assets/images/hotels/pelicanhouse-1.jpg";
import hotel7 from "../assets/images/hotels/raimond-1.jpg";

export const HOTEL_LISTINGS = [
  {
    id: 1,
    name: "Grand EbruLoria Resort",
    location: "Beachfront District",
    city: "Miami",
    country: "Turkey",
    roomNumber: 50,
    image: hotel1,
    amenities: ["WiFi", "Pool", "Gym", "Restaurant", "Parking"],
    type: "Luxury Resort",
    status: ["For Sale"],
    description:
      "Luxury beachfront resort with world-class amenities and stunning ocean views. Premium investment opportunity in prime tourist destination.",
  },
  {
    id: 2,
    name: "EbruLoria Boutique Hotel",
    location: "Historic Center",
    city: "Charleston",
    country: "Turkey",
    roomNumber: 25,
    image: hotel2,
    amenities: ["WiFi", "Restaurant", "Parking"],
    type: "Boutique Hotel",
    status: ["For Rent"],
    description:
      "Charming boutique hotel in the heart of historic district. Perfect for investors seeking steady rental income in cultural area.",
  },
  {
    id: 3,
    name: "Metropolitan Business Hotel",
    location: "Financial District",
    city: "New York",
    country: "Turkey",
    roomNumber: 80,
    image: hotel3,
    amenities: ["WiFi", "Gym", "Restaurant", "Parking"],
    type: "Business Hotel",
    status: ["For Sale", "For Rent"],
    description:
      "Modern business hotel in prime financial location. Excellent for corporate clients with flexible purchase or rental options.",
  },
  {
    id: 4,
    name: "Coastal Retreat Hotel",
    location: "Seaside",
    city: "San Diego",
    country: "Turkey",
    roomNumber: 120,
    image: hotel4,
    amenities: ["WiFi", "Pool", "Gym", "Restaurant", "Parking"],
    type: "Resort Hotel",
    status: ["For Sale"],
    description:
      "Expansive coastal resort with premium facilities. Exceptional investment opportunity with high ROI potential in scenic location.",
  },
  {
    id: 5,
    name: "Urban Lifestyle Hotel",
    location: "Downtown",
    city: "Los Angeles",
    country: "Turkey",
    roomNumber: 65,
    image: hotel5,
    amenities: ["WiFi", "Gym", "Restaurant", "Parking"],
    type: "Urban Hotel",
    status: ["For Rent"],
    description:
      "Contemporary urban hotel in vibrant downtown area. Ideal for rental investment with consistent occupancy rates.",
  },
  {
    id: 6,
    name: "Heritage Palace Hotel",
    location: "Old Town",
    city: "Boston",
    country: "Turkey",
    roomNumber: 95,
    image: hotel6,
    amenities: ["WiFi", "Pool", "Gym", "Restaurant", "Parking"],
    type: "Heritage Hotel",
    status: ["For Sale"],
    description:
      "Historic palace converted to luxury hotel. Rare opportunity to own prestigious property with rich cultural heritage.",
  },
  {
    id: 7,
    name: "Marina Bay Hotel",
    location: "Marina District",
    city: "Seattle",
    country: "Turkey",
    roomNumber: 45,
    image: hotel7,
    amenities: ["WiFi", "Pool", "Restaurant", "Parking"],
    type: "Boutique Hotel",
    status: ["For Sale", "For Rent"],
    description:
      "Waterfront boutique hotel with marina views. Flexible investment options in growing maritime tourism sector.",
  },
];

export const HOTEL_TYPES = [
  "All Types",
  "Luxury Resort",
  "Boutique Hotel",
  "Business Hotel",
  "Resort Hotel",
  "Urban Hotel",
  "Heritage Hotel",
];

export const LOCATIONS = [
  "All Locations",
  "Beachfront District",
  "Historic Center",
  "Financial District",
  "Seaside",
  "Downtown",
  "Old Town",
  "Marina District",
  "Mountain View",
];

export const CITIES = [
  "All Cities",
  "Miami",
  "Charleston",
  "New York",
  "San Diego",
  "Los Angeles",
  "Boston",
  "Seattle",
  "Denver",
];

export const STATUS_OPTIONS = ["All Status", "For Sale", "For Rent"];

export const AMENITY_ICONS = {
  WiFi: "FaWifi",
  Pool: "FaSwimmingPool",
  Gym: "FaDumbbell",
  Restaurant: "FaUtensils",
  Parking: "FaParking",
};

// Helper function to filter hotels
export const filterHotels = (hotels, filters) => {
  return hotels.filter((hotel) => {
    // Type filter
    if (
      filters.type &&
      filters.type !== "All Types" &&
      hotel.type !== filters.type
    ) {
      return false;
    }

    // Location filter
    if (
      filters.location &&
      filters.location !== "All Locations" &&
      hotel.location !== filters.location
    ) {
      return false;
    }

    // City filter
    if (
      filters.city &&
      filters.city !== "All Cities" &&
      hotel.city !== filters.city
    ) {
      return false;
    }

    // Status filter
    if (filters.status && filters.status !== "All Status") {
      if (!hotel.status.includes(filters.status)) {
        return false;
      }
    }

    return true;
  });
};

// Helper function to generate display title (since names are hidden)
export const getDisplayTitle = (hotel) => {
  return `${hotel.type} - ${hotel.location}, ${hotel.city}`;
};

// Helper function to get room count display
export const getRoomDisplay = (roomNumber) => {
  return `${roomNumber} Rooms`;
};
