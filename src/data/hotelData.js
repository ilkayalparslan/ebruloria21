/*
PERFORMANCE OPTIMIZATION NOTES FOR SCALING TO 50+ HOTELS:

OPTION 3: JSON METADATA + DYNAMIC IMAGE LOADING (BEST PERFORMANCE)
This approach stores only hotel metadata and generates image paths dynamically.
Images are loaded on-demand when user interacts with specific hotels.

BENEFITS:
- Smallest initial bundle size (no image imports)
- Fastest initial page load
- Images loaded progressively as needed
- Lowest memory usage initially
- Best performance with 50+ hotels

CURRENT STATUS: IMPLEMENTED - All images are now loaded dynamically
Hotel data is stored in individual JSON files for better organization

TIER SYSTEM: Hotels are prioritized by tier with randomization within each tier
- Premium hotels show first (but in random order each visit)
- Gold, Silver, Bronze, Basic follow in priority order
- Each tier is shuffled randomly to keep browsing fresh

MULTILINGUAL SUPPORT: Hotels now support multiple languages
- Each hotel JSON contains translations object with en, tr, ar
- Browser language detection for initial language
- Language preference persisted in localStorage
- Use getTranslatedHotel() or getHotelsWithTranslations() for localized content
*/

// Import individual hotel JSON files (same level as hotelData.js)
import arachData from "./arach.json";
import gulsultanData from "./gulsultan.json";
import hermanosData from "./hermanos.json";
import mardiaData from "./mardia.json";
import newhotelData from "./newhotel.json";
import pelicanhouseData from "./pelicanhouse.json";
import raimondData from "./raimond.json";
import riasuitesData from "./riasuites.json";
import erdemhotelData from "./erdemhotel.json";
import taksimparksuitesData from "./taksimparksuites.json";

// Raw hotel listings (with translations object)
export const RAW_HOTEL_LISTINGS = [
  arachData,
  gulsultanData,
  hermanosData,
  mardiaData,
  newhotelData,
  pelicanhouseData,
  raimondData,
  riasuitesData,
  erdemhotelData,
  taksimparksuitesData,
];

// Helper function to get translated content for a single hotel
export const getTranslatedHotel = (hotel, language = "en") => {
  const translations = hotel.translations[language] || hotel.translations.en;
  return {
    ...hotel,
    title: translations.title,
    description: translations.description,
    type: translations.type,
    amenities: translations.amenities,
  };
};

// Function to get all hotels with translations for a specific language
export const getHotelsWithTranslations = (language = "en") => {
  return RAW_HOTEL_LISTINGS.map((hotel) => getTranslatedHotel(hotel, language));
};

// Default export (for backward compatibility) - returns English translations
export const HOTEL_LISTINGS = getHotelsWithTranslations("en");

export const HOTEL_TYPES = [
  "All Types",
  "Luxury Resort",
  "Boutique Hotel",
  "Business Hotel",
  "Resort Hotel",
  "Urban Hotel",
  "Heritage Hotel",
  "Budget Hotel",
];

export const LOCATIONS = [
  "All Locations",
  "Beachfront District",
  "Historic Center",
  "Financial District",
  "Seaside",
  "Modern District",
  "Aksaray",
  "Kumkapi Historic District",
  "Marina District",
];

export const CITIES = ["All Cities", "Istanbul", "Trabzon", "Ankara", "Izmir"];

export const STATUS_OPTIONS = ["All Status", "For Sale", "For Rent"];

export const AMENITY_ICONS = {
  WiFi: "FaWifi",
  "Swimming Pool": "FaSwimmingPool",
  "Fitness Center": "FaDumbbell",
  Restaurant: "FaUtensils",
  "Free Parking": "FaParking",
  "Airport Shuttle": "FaPlane",
  "24/7 Reception": "FaClock",
  "Business Center": "FaBriefcase",
  "Conference Rooms": "FaUsers",
  "Room Service": "FaBell",
  Sauna: "FaHotTub",
  "Air Conditioning": "FaSnowflake",
  "Buffet Breakfast": "FaCoffee",
  "Concierge Service": "FaConciergeAbell",
  Elevator: "FaArrowUp",
};

// TIER SYSTEM CONFIGURATION
export const TIER_LEVELS = ["premium", "gold", "silver", "bronze", "basic"];

export const TIER_COLORS = {
  premium: "#FFD700", // Gold
  gold: "#FFA500", // Orange
  silver: "#C0C0C0", // Silver
  bronze: "#CD7F32", // Bronze
  basic: "#808080", // Gray
};

export const TIER_LABELS = {
  premium: "Premium",
  gold: "Gold",
  silver: "Silver",
  bronze: "Bronze",
  basic: "Basic",
};

// TIER-BASED PRIORITIZATION FUNCTION (works with translated hotels)
export const getPrioritizedHotels = (hotels) => {
  // Group hotels by tier
  const tiers = {
    premium: [],
    gold: [],
    silver: [],
    bronze: [],
    basic: [],
  };

  // Sort hotels into their tiers
  hotels.forEach((hotel) => {
    const tier = hotel.tier || "basic"; // Default to basic if no tier
    if (tiers[tier]) {
      tiers[tier].push(hotel);
    }
  });

  // Shuffle function - randomizes array order
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Return hotels in priority order with random arrangement within each tier
  return [
    ...shuffleArray(tiers.premium), // Premium hotels first (random order)
    ...shuffleArray(tiers.gold), // Gold hotels next (random order)
    ...shuffleArray(tiers.silver), // Silver hotels next (random order)
    ...shuffleArray(tiers.bronze), // Bronze hotels next (random order)
    ...shuffleArray(tiers.basic), // Basic hotels last (random order)
  ];
};

// Helper function to get tier badge color
export const getTierColor = (tier) => {
  return TIER_COLORS[tier] || TIER_COLORS.basic;
};

// Helper function to get tier display label
export const getTierLabel = (tier) => {
  return TIER_LABELS[tier] || TIER_LABELS.basic;
};

// Helper function to get hotels by specific tier
export const getHotelsByTier = (hotels, tier) => {
  return hotels.filter((hotel) => (hotel.tier || "basic") === tier);
};

// Helper function to count hotels by tier
export const getTierCounts = (hotels) => {
  const counts = {
    premium: 0,
    gold: 0,
    silver: 0,
    bronze: 0,
    basic: 0,
  };

  hotels.forEach((hotel) => {
    const tier = hotel.tier || "basic";
    if (counts[tier] !== undefined) {
      counts[tier]++;
    }
  });

  return counts;
};

// DYNAMIC IMAGE LOADING FUNCTIONS

// Helper function to generate image paths dynamically
export const getHotelImages = (hotel, count = null) => {
  const imageCount = count || hotel.imageCount;
  const folderName = hotel.imageFolderName;

  return Array.from({ length: imageCount }, (_, i) => {
    const imageNumber = i + 1;
    return `/images/hotels/${folderName}/${folderName}-${imageNumber}.jpg`;
  });
};

// Get only the first image (hero image) for performance
export const getHotelHeroImage = (hotel) => {
  const folderName = hotel.imageFolderName;
  return `/images/hotels/${folderName}/${folderName}-1.jpg`;
};

// Get thumbnail images (first 5 for gallery previews)
export const getHotelThumbnails = (hotel, count = 5) => {
  return getHotelImages(hotel, Math.min(count, hotel.imageCount));
};

// EXISTING HELPER FUNCTIONS (updated to work with translated hotels)

// Helper function to filter hotels (works with prioritized hotels)
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

    // Tier filter (if implemented in UI)
    if (filters.tier && filters.tier !== "All Tiers") {
      const hotelTier = hotel.tier || "basic";
      if (hotelTier !== filters.tier) {
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
  if (roomNumber >= 100) return "100+";
  if (roomNumber >= 50) return "50+";
  if (roomNumber >= 20) return "20+";
  if (roomNumber >= 10) return "10+";
  return roomNumber.toString();
};

// MULTILINGUAL HELPER FUNCTIONS

// Get unique cities from translated hotels
export const getUniqueCities = (hotels) => {
  const cities = [
    ...new Set(hotels.map((hotel) => `${hotel.city}, ${hotel.country}`)),
  ];
  return cities.sort();
};

// Get unique amenities from translated hotels
export const getUniqueAmenities = (hotels) => {
  const amenities = new Set();
  hotels.forEach((hotel) => {
    if (hotel.amenities) {
      hotel.amenities.forEach((amenity) => amenities.add(amenity));
    }
  });
  return Array.from(amenities).sort();
};

// Get unique hotel types from translated hotels
export const getUniqueHotelTypes = (hotels) => {
  const types = [...new Set(hotels.map((hotel) => hotel.type))];
  return ["All Types", ...types.sort()];
};
