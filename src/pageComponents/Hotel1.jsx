import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { HOTEL_LISTINGS, getRoomDisplay } from "../data/hotelData";
import { MdLocationOn, MdHome, MdStar, MdClose } from "react-icons/md";

const Hotel1 = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Get unique cities for filter dropdown
  const uniqueCities = useMemo(() => {
    const cities = [
      ...new Set(
        HOTEL_LISTINGS.map((hotel) => `${hotel.city}, ${hotel.country}`)
      ),
    ];
    return cities.sort();
  }, []);

  // Filter hotels based on status and city
  const filteredHotels = useMemo(() => {
    return HOTEL_LISTINGS.filter((hotel) => {
      const statusMatch =
        statusFilter === "all" || hotel.status.includes(statusFilter);
      const cityMatch =
        cityFilter === "all" ||
        `${hotel.city}, ${hotel.country}` === cityFilter;
      return statusMatch && cityMatch;
    });
  }, [statusFilter, cityFilter]);

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
    return words.slice(0, 5).join(" ");
  };

  const openContactModal = (hotel) => {
    setSelectedHotel(hotel);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: `Hello, I am interested in ${hotel.type} with ${getRoomDisplay(
        hotel.roomNumber
      )}. Please contact me for more information.`,
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
    // Handle form submission here
    console.log("Contact form submitted:", formData);
    alert("Thank you for your inquiry! We'll contact you soon.");
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
      let newIndex = currentIndex;

      if (isLeftSwipe && currentIndex < totalImages - 1) {
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
              onClick={() => setStatusFilter("all")}
              className={`flex-1 md:flex-none px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === "all"
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter("For Sale")}
              className={`flex-1 md:flex-none px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === "For Sale"
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              For Sale
            </button>
            <button
              onClick={() => setStatusFilter("For Rent")}
              className={`flex-1 md:flex-none px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === "For Rent"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              For Rent
            </button>
          </div>

          {/* City Filter Dropdown */}
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="w-full md:w-auto px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Cities</option>
            {uniqueCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Hotel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Hotel Image - Increased height */}
              <div className="relative h-80 overflow-hidden">
                {/* Carousel Container - Transform based on currentImageIndex */}
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
                    handleTouchEnd(index, hotel.images?.length || 1)
                  }
                >
                  {/* Generate 6 images */}
                  {hotel.images.slice(0, 6).map((image, imgIndex) => (
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
                  {Array.from({
                    length: Math.min(hotel.images?.length || 1, 6),
                  }).map((_, imgIndex) => (
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

                {/* Status Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {hotel.status.map((status, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                        status === "For Sale" ? "bg-green-500" : "bg-blue-500"
                      }`}
                    >
                      {status}
                    </span>
                  ))}
                </div>

                {/* Contact Agent Button */}
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => openContactModal(hotel)}
                    className="btn-primary-gradient text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Contact Agent
                  </button>
                </div>
              </div>
              {/* Hotel Details - Reduced padding and spacing */}
              <div className="p-4">
                {/* Location */}
                <div className="flex items-center text-gray-600 mb-2">
                  <MdLocationOn className="w-4 h-4 mr-2" />
                  <span className="text-lg font-semibold text-gray-800">
                    {hotel.city}, {hotel.country}
                  </span>
                </div>

                {/* Description with toggle */}
                <div className="mb-3">
                  <div className="flex items-start justify-between">
                    <p className="text-gray-600 text-xs leading-relaxed flex-1 mr-2">
                      {expandedDescriptions[index]
                        ? hotel.description
                        : getTruncatedDescription(hotel.description)}
                      {!expandedDescriptions[index] &&
                        hotel.description.split(" ").length > 5 &&
                        "..."}
                    </p>
                    {hotel.description.split(" ").length > 5 && (
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
                  <MdHome className="w-4 h-4 mr-2" />
                  <span className="font-medium text-sm">
                    {getRoomDisplay(hotel.roomNumber)} Rooms
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

                {/* Amenities - Reduced spacing */}
                {hotel.amenities && hotel.amenities.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                        >
                          {amenity}
                        </span>
                      ))}
                      {hotel.amenities.length > 3 && (
                        <span className="text-gray-500 text-xs">
                          +{hotel.amenities.length - 3} more
                        </span>
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
                        /night
                      </span>
                    </div>
                  )}
                </div>

                {/* Get Details Button */}
                <button
                  onClick={() => handleGetDetails(hotel)}
                  className="w-full btn-primary-gradient text-white py-2 px-4 rounded-lg font-medium text-sm"
                >
                  Get Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredHotels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No properties found matching your filters.
            </p>
          </div>
        )}
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="relative gradient-primary text-white p-6 rounded-t-2xl">
              <h3 className="text-xl font-semibold">Contact Agent</h3>
              <p className="text-primary-light text-sm mt-1">
                {selectedHotel?.city}, {selectedHotel?.country}
              </p>
              <button
                onClick={closeContactModal}
                className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-colors custom-focus"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-colors custom-focus"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-colors custom-focus"
                  placeholder="john.doe@example.com"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-colors custom-focus"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
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
                  <span className="text-gray-600">Property Type:</span>
                  <span className="font-medium text-gray-800">
                    {selectedHotel?.type}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-600">Rooms:</span>
                  <span className="font-medium text-gray-800">
                    {getRoomDisplay(selectedHotel?.roomNumber)}
                  </span>
                </div>
                {selectedHotel?.price && (
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium text-gray-800">
                      ${selectedHotel.price}/night
                    </span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full btn-primary-gradient text-white py-3 px-6 rounded-lg font-semibold"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotel1;
