import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../data/translations";
import { usePropertyFilter } from "../hooks/usePropertyFilter";
import {
  getHotelsWithTranslations,
  getUniqueCities,
  getRoomDisplay,
  getHotelImages,
  getPrioritizedHotels,
} from "../data/hotelData";
import { MdLocationOn, MdHotel, MdStar, MdClose } from "react-icons/md";

const Hotel1 = () => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useTranslation();
  const [statusFilter, setStatusFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [showContactModal, setShowContactModal] = useState(false);
  const [expandedAmenities, setExpandedAmenities] = useState({});
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [hotelsPerPage] = useState(9);

  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Get hotels with translations for current language
  const allHotelsWithTranslations = useMemo(() => {
    const hotelsWithTranslations = getHotelsWithTranslations(currentLanguage);
    return hotelsWithTranslations;
  }, [currentLanguage]);

  // Apply geolocation filtering
  const {
    filteredProperties: geoFilteredHotels,
    isLoading: locationLoading,
    userCountry,
  } = usePropertyFilter(allHotelsWithTranslations);

  // Use geo-filtered hotels as the base for other filters
  const HOTEL_LISTINGS = geoFilteredHotels;

  // Get unique cities for filter dropdown (from geo-filtered hotels)
  const uniqueCities = useMemo(() => {
    return getUniqueCities(HOTEL_LISTINGS);
  }, [HOTEL_LISTINGS]);

  // Filter and prioritize hotels
  const filteredHotels = useMemo(() => {
    const prioritized = getPrioritizedHotels(HOTEL_LISTINGS);
    const filtered = prioritized.filter((hotel) => {
      const statusMatch =
        statusFilter === "all" || hotel.status.includes(statusFilter);
      const cityMatch =
        cityFilter === "all" ||
        `${hotel.city}, ${hotel.country}` === cityFilter;
      return statusMatch && cityMatch;
    });

    setCurrentPage(1);
    return filtered;
  }, [statusFilter, cityFilter, HOTEL_LISTINGS]);

  // Show loading screen while detecting location
  if (locationLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 mb-2">
            Detecting your location...
          </p>
          <p className="text-sm text-gray-500">
            Preparing personalized hotel listings
          </p>
        </div>
      </div>
    );
  }

  const totalHotels = filteredHotels.length;
  const totalPages = Math.ceil(totalHotels / hotelsPerPage);
  const startIndex = 0;
  const endIndex = currentPage * hotelsPerPage;
  const currentHotels = filteredHotels.slice(startIndex, endIndex);
  const hasMore = endIndex < totalHotels;

  const handleLoadMore = () => {
    if (hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleCityFilter = (city) => {
    setCityFilter(city);
    setCurrentPage(1);
  };

  // Toggle description expansion
  const toggleDescription = (index) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Get truncated description (4-5 words)
  const getTruncatedDescription = (description) => {
    const words = description.split(" ");
    return words.slice(0, 4).join(" ");
  };

  const openContactModal = (hotel) => {
    setSelectedHotel(hotel);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: `${t("interestedInProperty")} ${hotel.type} ${getRoomDisplay(
        hotel.roomNumber
      )} ${t("rooms")}. ${t("pleaseContactMe")}`,
    });
    setShowContactModal(true);
  };

  const closeContactModal = () => {
    setShowContactModal(false);
    setSelectedHotel(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    alert(t("thankYouInquiry"));
    closeContactModal();
  };

  const handleGetDetails = (hotel) => {
    navigate(`/hotels/${hotel.adNumber}`);
  };

  // Handle dot click navigation
  const handleDotClick = (hotelIndex, imageIndex) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [hotelIndex]: imageIndex,
    }));
  };

  const toggleAmenities = (index) => {
    setExpandedAmenities((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Handle touch start for mobile swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  // Handle touch move
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // Handle touch end and swipe detection
  const handleTouchEnd = (hotelIndex, totalImages) => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe || isRightSwipe) {
      const currentIndex = currentImageIndex[hotelIndex] || 0;
      const maxIndex = Math.min(totalImages, 6) - 1;
      let newIndex = currentIndex;

      if (isLeftSwipe && currentIndex < maxIndex) {
        newIndex = currentIndex + 1;
      } else if (isRightSwipe && currentIndex > 0) {
        newIndex = currentIndex - 1;
      }

      setCurrentImageIndex((prev) => ({
        ...prev,
        [hotelIndex]: newIndex,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Filter Buttons */}
        <div className="mb-6 flex flex-col md:flex-row md:flex-wrap gap-4 md:items-center">
          {/* Status Filter Buttons */}

          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={() => handleStatusFilter("all")}
              className={`flex-1 md:flex-none px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                statusFilter === "all"
                  ? "btn-primary-gradient text-white shadow-lg" // ✅ Your primary gradient
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {t("all")}
            </button>
            <button
              onClick={() => handleStatusFilter("For Sale")}
              className={`flex-1 md:flex-none px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                statusFilter === "For Sale"
                  ? "btn-primary-gradient text-white shadow-lg" // ✅ Same as "all" button
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {t("forSale")}
            </button>
            <button
              onClick={() => handleStatusFilter("For Rent")}
              className={`flex-1 md:flex-none px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                statusFilter === "For Rent"
                  ? "btn-primary-gradient text-white shadow-lg" // ✅ Same as "all" button
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {t("forRent")}
            </button>
          </div>
          {/* City Filter Dropdown */}
          <select
            value={cityFilter}
            onChange={(e) => handleCityFilter(e.target.value)}
            className="w-full md:w-auto px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          >
            <option value="all">{t("allCities")}</option>
            {uniqueCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Hotel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentHotels.map((hotel, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Hotel Image carousel */}
              <div className="relative h-80 overflow-hidden">
                <div
                  className="flex h-full transition-transform duration-300 ease-in-out"
                  style={{
                    transform: `translateX(-${
                      (currentImageIndex[index] || 0) * 100
                    }%)`,
                  }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={() =>
                    handleTouchEnd(
                      index,
                      getHotelImages(hotel).slice(0, 6).length
                    )
                  }
                >
                  {getHotelImages(hotel)
                    .slice(0, 6)
                    .map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={image}
                        alt={`Hotel ${imgIndex + 1}`}
                        className="w-full h-full object-cover flex-shrink-0"
                      />
                    ))}
                </div>
                {/* Navigation Dots */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {getHotelImages(hotel)
                    .slice(0, 6)
                    .map((_, imgIndex) => (
                      <button
                        key={imgIndex}
                        onClick={() => handleDotClick(index, imgIndex)}
                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                          (currentImageIndex[index] || 0) === imgIndex
                            ? "bg-white"
                            : "bg-white/50 hover:bg-white/75"
                        }`}
                      />
                    ))}
                </div>
              </div>

              {/* Hotel Details */}
              <div className="p-4">
                {/* Location */}
                <div className="flex items-center text-gray-600 mb-2">
                  <MdLocationOn className="w-4 h-4 mr-2" />
                  <span className="text-lg font-semibold text-gray-800">
                    {t(`cities.${hotel.city}`) || hotel.city},{" "}
                    {t(`countries.${hotel.country}`) || hotel.country}
                  </span>
                </div>

                {/* ADD THIS: Status Tag */}
                {hotel.status && hotel.status.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-2">
                      {hotel.status.map((status, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${
                            status === "For Sale"
                              ? "bg-green-100 text-green-700"
                              : status === "For Rent"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {status === "For Sale"
                            ? t("forSale")
                            : status === "For Rent"
                            ? t("forRent")
                            : status}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Title */}
                {hotel.title && (
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                      {hotel.title}
                    </h3>
                  </div>
                )}

                {/* Description with toggle */}
                <div className="mb-3">
                  <div className="flex items-start justify-between">
                    <p className="text-gray-600 text-xs leading-relaxed flex-1 mr-2">
                      {expandedDescriptions[index]
                        ? hotel.description
                        : getTruncatedDescription(hotel.description)}
                      {!expandedDescriptions[index] &&
                        hotel.description.split(" ").length > 4 &&
                        "..."}
                    </p>
                    {hotel.description.split(" ").length > 4 && (
                      <button
                        onClick={() => toggleDescription(index)}
                        className="text-gray-400 hover:text-gray-600 transition-colors ml-1 flex-shrink-0"
                      >
                        <svg
                          className={`w-4 h-4 transform transition-transform ${
                            expandedDescriptions[index] ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Room Count */}
                <div className="flex items-center text-gray-600 mb-3">
                  <MdHotel className="w-4 h-4 mr-2" />
                  <span className="font-medium text-sm">
                    {getRoomDisplay(hotel.roomNumber)} {t("rooms")}
                  </span>
                </div>

                {/* Property Type & Rating */}
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium uppercase tracking-wide">
                    {hotel.type}
                  </span>
                  {hotel.rating && (
                    <div className="flex items-center">
                      <MdStar className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-gray-700 text-sm font-medium">
                        {hotel.rating}
                      </span>
                    </div>
                  )}
                </div>

                {/* Amenities */}
                {hotel.amenities && hotel.amenities.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {(expandedAmenities[index]
                        ? hotel.amenities
                        : hotel.amenities.slice(0, 3)
                      ).map((amenity, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                        >
                          {amenity}
                        </span>
                      ))}
                      {hotel.amenities.length > 3 && (
                        <button
                          onClick={() => toggleAmenities(index)}
                          className="text-blue-600 hover:text-blue-800 transition-colors flex items-center text-xs"
                        >
                          <svg
                            className={`w-3 h-3 transform transition-transform ml-1 ${
                              expandedAmenities[index] ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                  {hotel.price && (
                    <div className="text-xl font-bold text-gray-900">
                      ${hotel.price}
                      <span className="text-sm text-gray-500 font-normal">
                        {t("night")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Get Details Button */}
                <button
                  onClick={() => handleGetDetails(hotel)}
                  className="w-full btn-primary-gradient text-white py-2 px-4 rounded-lg font-medium text-sm"
                >
                  {t("getDetails")}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={handleLoadMore}
              className="btn-primary-gradient text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              {t("loadMore")} ({totalHotels - endIndex} {t("remaining")})
            </button>
          </div>
        )}

        {/* Pagination info */}
        {totalHotels > 0 && (
          <div className="text-center mt-4 text-sm text-gray-500">
            {t("page")} {currentPage} {t("of")} {totalPages}
          </div>
        )}

        {/* No results message */}
        {currentHotels.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🏨</div>
              <p className="text-gray-500 text-lg mb-2">
                {t("noPropertiesFound")}
              </p>
              {userCountry === "TR" &&
                geoFilteredHotels.length < allHotelsWithTranslations.length && (
                  <p className="text-sm text-gray-400">
                    Some properties may not be available in your region
                  </p>
                )}
            </div>
          </div>
        )}
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="relative gradient-primary text-white p-6 rounded-t-2xl">
              <h3 className="text-xl font-semibold">
                {t("contactAgentModal")}
              </h3>
              <p className="text-primary-light text-sm mt-1">
                {t(`cities.${selectedHotel?.city}`) || selectedHotel?.city},{" "}
                {t(`countries.${selectedHotel?.country}`) ||
                  selectedHotel?.country}
              </p>
              <button
                onClick={closeContactModal}
                className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("firstName")} *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-colors custom-focus"
                    placeholder={t("yourName")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("lastName")} *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-colors custom-focus"
                    placeholder={t("yourSurname")}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("emailAddress")} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-colors custom-focus"
                  placeholder={t("yourEmail")}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("phoneNumber")} *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-colors custom-focus"
                  placeholder={t("yourPhone")}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("message")}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-colors custom-focus resize-none"
                />
              </div>

              {/* Property Details Card */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{t("propertyType")}:</span>
                  <span className="font-medium text-gray-800">
                    {selectedHotel?.type}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-600">{t("rooms")}:</span>
                  <span className="font-medium text-gray-800">
                    {getRoomDisplay(selectedHotel?.roomNumber)}
                  </span>
                </div>
                {selectedHotel?.price && (
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-600">{t("price")}:</span>
                    <span className="font-medium text-gray-800">
                      ${selectedHotel.price}
                      {t("night")}
                    </span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full btn-primary-gradient text-white py-3 px-6 rounded-lg font-semibold"
              >
                {t("sendMessage")}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotel1;
