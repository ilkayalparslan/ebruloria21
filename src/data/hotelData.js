// Import all images with correct filenames
import arach1 from "../assets/images/hotels/arach/arach-1.jpg";
import arach2 from "../assets/images/hotels/arach/arach-2.jpg";
import arach3 from "../assets/images/hotels/arach/arach-3.jpg";
import arach4 from "../assets/images/hotels/arach/arach-4.jpg";
import arach5 from "../assets/images/hotels/arach/arach-5.jpg";
import arach6 from "../assets/images/hotels/arach/arach-6.jpg";
import gulsultan1 from "../assets/images/hotels/gulsultan/gulsultan-1.jpg";
import gulsultan2 from "../assets/images/hotels/gulsultan/gulsultan-2.jpg";
import gulsultan3 from "../assets/images/hotels/gulsultan/gulsultan-3.jpg";
import gulsultan4 from "../assets/images/hotels/gulsultan/gulsultan-4.jpg";
import gulsultan5 from "../assets/images/hotels/gulsultan/gulsultan-5.jpg";
import gulsultan6 from "../assets/images/hotels/gulsultan/gulsultan-6.jpg";
import hermanos1 from "../assets/images/hotels/hermanos/hermanos-1.jpg";
import hermanos2 from "../assets/images/hotels/hermanos/hermanos-2.jpg";
import hermanos3 from "../assets/images/hotels/hermanos/hermanos-3.jpg";
import hermanos4 from "../assets/images/hotels/hermanos/hermanos-4.jpg";
import hermanos5 from "../assets/images/hotels/hermanos/hermanos-5.jpg";
import hermanos6 from "../assets/images/hotels/hermanos/hermanos-6.jpg";
import mardia1 from "../assets/images/hotels/mardia/mardia-1.jpg";
import mardia2 from "../assets/images/hotels/mardia/mardia-2.jpg";
import mardia3 from "../assets/images/hotels/mardia/mardia-3.jpg";
import mardia4 from "../assets/images/hotels/mardia/mardia-4.jpg";
import mardia5 from "../assets/images/hotels/mardia/mardia-5.jpg";
import mardia6 from "../assets/images/hotels/mardia/mardia-6.jpg";
import newhotel1 from "../assets/images/hotels/newhotel/newhotel-1.jpg";
import newhotel2 from "../assets/images/hotels/newhotel/newhotel-2.jpg";
import newhotel3 from "../assets/images/hotels/newhotel/newhotel-3.jpg";
import newhotel4 from "../assets/images/hotels/newhotel/newhotel-4.jpg";
import newhotel5 from "../assets/images/hotels/newhotel/newhotel-5.jpg";
import newhotel6 from "../assets/images/hotels/newhotel/newhotel-6.jpg";
import pelicanhouse1 from "../assets/images/hotels/pelicanhouse/pelicanhouse-1.jpg";
import pelicanhouse2 from "../assets/images/hotels/pelicanhouse/pelicanhouse-2.jpg";
import pelicanhouse3 from "../assets/images/hotels/pelicanhouse/pelicanhouse-3.jpg";
import pelicanhouse4 from "../assets/images/hotels/pelicanhouse/pelicanhouse-4.jpg";
import pelicanhouse5 from "../assets/images/hotels/pelicanhouse/pelicanhouse-5.jpg";
import pelicanhouse6 from "../assets/images/hotels/pelicanhouse/pelicanhouse-6.jpg";
import raimond1 from "../assets/images/hotels/raimond/raimond-1.jpg";
import raimond2 from "../assets/images/hotels/raimond/raimond-2.jpg";
import raimond3 from "../assets/images/hotels/raimond/raimond-3.jpg";
import raimond4 from "../assets/images/hotels/raimond/raimond-4.jpg";
import raimond5 from "../assets/images/hotels/raimond/raimond-5.jpg";
import raimond6 from "../assets/images/hotels/raimond/raimond-6.jpg";

export const HOTEL_LISTINGS = [
  {
    id: 1,
    name: "Arach Hotel",
    location: "Beachfront District",
    city: "Istanbul",
    country: "Turkey",
    roomNumber: 50,
    images: [arach1, arach2, arach3, arach4, arach5, arach6],
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
    city: "Istanbul",
    country: "Turkey",
    roomNumber: 25,
    images: [
      gulsultan1,
      gulsultan2,
      gulsultan3,
      gulsultan4,
      gulsultan5,
      gulsultan6,
    ],
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
    city: "Istanbul",
    country: "Turkey",
    roomNumber: 80,
    images: [hermanos1, hermanos2, hermanos3, hermanos4, hermanos5, hermanos6],
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
    city: "Istanbul",
    country: "Turkey",
    roomNumber: 120,
    images: [mardia1, mardia2, mardia3, mardia4, mardia5, mardia6],
    amenities: ["WiFi", "Pool", "Gym", "Restaurant", "Parking"],
    type: "Resort Hotel",
    status: ["For Sale"],
    description:
      "Expansive coastal resort with premium facilities. Exceptional investment opportunity with high ROI potential in scenic location.",
  },
  {
    id: 5,
    name: "Urban Lifestyle Hotel",
    location: "Istanbul",
    city: "Trabzon",
    country: "Turkey",
    roomNumber: 65,
    images: [newhotel1, newhotel2, newhotel3, newhotel4, newhotel5, newhotel6],
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
    city: "Ankara",
    country: "Turkey",
    roomNumber: 95,
    images: [
      pelicanhouse1,
      pelicanhouse2,
      pelicanhouse3,
      pelicanhouse4,
      pelicanhouse5,
      pelicanhouse6,
    ],
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
    city: "Izmir",
    country: "Turkey",
    roomNumber: 45,
    images: [raimond1, raimond2, raimond3, raimond4, raimond5, raimond6],
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
