import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HOTEL_LISTINGS, getRoomDisplay } from "../data/hotelData";
import {
  MdArrowBack,
  MdFavorite,
  MdFavoriteBorder,
  MdShare,
  MdLocationOn,
  MdHome,
  MdLayers,
  MdSquareFoot,
  MdStar,
  MdPhone,
  MdEmail,
  MdInfo,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdClose,
} from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

// HotelDetails Component - Professional property details with mobile-first responsive design
// Image gallery container: lines [95-145] (full-screen mobile h-screen, sidebar desktop h-96 layout)
// Header overlay controls: lines [105-135] (back, heart, share, show all buttons with blur effects)
// Mobile image navigation: lines [165-195] (touch/swipe through hotel.images array)
// Desktop image layout: lines [200-230] (main image + thumbnail sidebar)
// Property information grid: lines [270-350] (responsive layout for hotel data)
// Call-to-action section: lines [360-395] (Request Tour, Contact Agent, quick actions)
// Urgency marketing features: lines [400-430] (limited availability, market insights)
// Navigation integration: lines [50-75] (Get Details button routing from hotel cards)
// Responsive breakpoints: lines [95-270] (mobile h-screen, desktop h-96 with sidebar)
// Share functionality: lines [80-90] (copy URL to clipboard implementation)
// Favorites system: lines [75-85] (heart toggle with local state management)
//
// Layout Dimensions:
// - Mobile gallery: h-screen (100vh) - full viewport height
// - Desktop gallery: h-96 (384px) with thumbnail sidebar
// - Overlay buttons: backdrop-blur-sm bg-white/50 rounded-full p-3
// - CTA buttons: px-8 py-3 rounded-lg (primary/secondary styling)
// - Image dots: w-2 h-2 rounded-full with gap-1 spacing
// - Sidebar width: 40% desktop, full width mobile
//
// Touch Interaction:
// - Minimum swipe distance: 50px for image navigation
// - Touch coordinates stored in touchStart/touchEnd states
// - Smooth transitions: duration-300 ease-in-out
// 199 images height

const HotelDetails = () => {
  const { adNumber } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);

  // Find hotel by adNumber
  useEffect(() => {
    const foundHotel = HOTEL_LISTINGS.find((h) => h.adNumber === adNumber);
    setHotel(foundHotel);
    setLoading(false);
  }, [adNumber]);

  // Check if hotel is in favorites (localStorage)
  useEffect(() => {
    if (hotel) {
      const favorites = JSON.parse(
        localStorage.getItem("hotelFavorites") || "[]"
      );
      setIsFavorite(favorites.includes(hotel.adNumber));
    }
  }, [hotel]);

  // Toggle favorite status
  const toggleFavorite = () => {
    const favorites = JSON.parse(
      localStorage.getItem("hotelFavorites") || "[]"
    );
    let newFavorites;

    if (isFavorite) {
      newFavorites = favorites.filter((id) => id !== hotel.adNumber);
    } else {
      newFavorites = [...favorites, hotel.adNumber];
    }

    localStorage.setItem("hotelFavorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  // Share functionality
  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentImageIndex < (hotel.images?.length || 1) - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    } else if (isRightSwipe && currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    }
  };

  // Navigate images
  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const nextImage = () => {
    if (currentImageIndex < (hotel.images?.length || 1) - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    }
  };

  // Generate random availability number
  const availableProperties = Math.floor(Math.random() * 4) + 2; // 2-5

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Property Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The property you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/hotels")}
            className="btn-primary-gradient text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Hotels
          </button>
        </div>
      </div>
    );
  }

  const images = hotel.images || [
    hotel.image,
    hotel.image,
    hotel.image,
    hotel.image,
    hotel.image,
    hotel.image,
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Full-screen Image Gallery */}
        <div className="relative h-80 overflow-hidden">
          {/* Image Container */}
          <div
            className="flex h-full transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Property ${index + 1}`}
                className="w-full h-full object-cover flex-shrink-0"
              />
            ))}
          </div>

          {/* Overlay Controls */}
          <div className="absolute top-4 left-4">
            <button
              onClick={() => navigate("/hotels")}
              className="backdrop-blur-sm bg-white/50 rounded-full p-3 hover:bg-white/70 transition-colors"
            >
              <MdArrowBack className="w-6 h-6 text-gray-800" />
            </button>
          </div>

          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={toggleFavorite}
              className="backdrop-blur-sm bg-white/50 rounded-full p-3 hover:bg-white/70 transition-colors"
            >
              {isFavorite ? (
                <MdFavorite className="w-6 h-6 text-red-500" />
              ) : (
                <MdFavoriteBorder className="w-6 h-6 text-gray-800" />
              )}
            </button>
            <button
              onClick={handleShare}
              className="backdrop-blur-sm bg-white/50 rounded-full p-3 hover:bg-white/70 transition-colors"
            >
              <MdShare className="w-6 h-6 text-gray-800" />
            </button>
          </div>

          {/* Image Counter */}
          {/* Image Counter with View All button */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <button
              onClick={() => setShowAllImages(true)}
              className="backdrop-blur-sm bg-white/50 rounded-full px-3 py-2 hover:bg-white/70 transition-colors"
            >
              <span className="text-sm font-medium text-gray-800">
                View All
              </span>
            </button>
            <div className="backdrop-blur-sm bg-white/50 rounded-full px-3 py-2">
              <span className="text-sm font-medium text-gray-800">
                {currentImageIndex + 1} of {images.length}
              </span>
            </div>
          </div>

          {/* Navigation Dots */}
          {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentImageIndex === index ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div> */}
        </div>

        {/* Property Details - Mobile */}
        <div className="bg-white p-6">
          {/* Status and Location */}
          <div className="flex flex-wrap gap-2 mb-4">
            {hotel.status.map((status, idx) => (
              <span
                key={idx}
                className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                  status === "For Sale" ? "bg-green-500" : "bg-blue-500"
                }`}
              >
                {status}
              </span>
            ))}
          </div>

          <div className="flex items-center mb-4">
            <MdLocationOn className="w-5 h-5 text-gray-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">
              {hotel.city}, {hotel.country}
            </h1>
          </div>

          {/* Property Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <MdHome className="w-5 h-5 text-gray-600 mr-2" />
              <div>
                <div className="text-sm text-gray-600">Type</div>
                <div className="font-semibold">{hotel.type}</div>
              </div>
            </div>
            <div className="flex items-center">
              <MdLayers className="w-5 h-5 text-gray-600 mr-2" />
              <div>
                <div className="text-sm text-gray-600">Floors</div>
                <div className="font-semibold">{hotel.floorCount} floors</div>
              </div>
            </div>
            <div className="flex items-center">
              <MdHome className="w-5 h-5 text-gray-600 mr-2" />
              <div>
                <div className="text-sm text-gray-600">Rooms</div>
                <div className="font-semibold">
                  {getRoomDisplay(hotel.roomNumber)} rooms
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <MdSquareFoot className="w-5 h-5 text-gray-600 mr-2" />
              <div>
                <div className="text-sm text-gray-600">Area</div>
                <div className="font-semibold">{hotel.baseSquare} m²</div>
              </div>
            </div>
          </div>

          {/* Price */}
          {hotel.price && (
            <div className="mb-6">
              <div className="text-3xl font-bold text-gray-900">
                ${hotel.price}
                <span className="text-lg text-gray-500 font-normal">
                  /night
                </span>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {expandedDescription
                ? hotel.description
                : `${hotel.description.slice(0, 150)}...`}
            </p>
            <button
              onClick={() => setExpandedDescription(!expandedDescription)}
              className="text-blue-600 font-medium mt-2"
            >
              {expandedDescription ? "Show Less" : "Show More"}
            </button>
          </div>

          {/* Amenities */}
          {hotel.amenities && hotel.amenities.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {hotel.amenities.map((amenity, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Urgency Marketing */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <MdInfo className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />
              <div>
                <p className="text-orange-800 font-medium text-sm mb-1">
                  Only {availableProperties} similar properties available
                </p>
                <p className="text-orange-700 text-xs">
                  Properties like this sell within 30 days • Best purchase
                  window: Q1 2025
                </p>
              </div>
            </div>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="space-y-3 mb-6">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Request Tour
            </button>
            <button className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors">
              Contact Agent
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex justify-center space-x-4">
            <button className="flex items-center justify-center w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors">
              <FaWhatsapp className="w-6 h-6" />
            </button>
            <button className="flex items-center justify-center w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors">
              <MdPhone className="w-6 h-6" />
            </button>
            <button className="flex items-center justify-center w-12 h-12 bg-gray-500 hover:bg-gray-600 text-white rounded-full transition-colors">
              <MdEmail className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Full-screen Gallery Modal - Mobile Only */}
      {showAllImages && (
        <div className="fixed inset-0 bg-black z-50 md:hidden">
          {/* Close button */}
          <button
            onClick={() => setShowAllImages(false)}
            className="absolute top-4 left-4 z-10 backdrop-blur-sm bg-white/50 rounded-full p-3"
          >
            <MdArrowBack className="w-6 h-6 text-gray-800" />
          </button>

          {/* Vertical scrolling images */}
          <div className="h-full overflow-y-auto pt-16 pb-4">
            <div className="flex flex-col gap-4 px-4">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Property ${index + 1}`}
                  className="w-full h-80 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto p-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-600">
              <button
                onClick={() => navigate("/")}
                className="hover:text-gray-800"
              >
                Home
              </button>
              <span className="mx-2">›</span>
              <button
                onClick={() => navigate("/hotels")}
                className="hover:text-gray-800"
              >
                Hotels
              </button>
              <span className="mx-2">›</span>
              <span className="text-gray-800">{hotel.city}</span>
              <span className="mx-2">›</span>
              <span className="text-gray-800">{hotel.adNumber}</span>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Image Gallery - 60% */}
            <div className="w-3/5">
              <div className="relative h-96 rounded-xl overflow-hidden mb-4">
                <img
                  src={images[currentImageIndex]}
                  alt={`Property ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Desktop Navigation Arrows */}
                {currentImageIndex > 0 && (
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 backdrop-blur-sm bg-white/50 rounded-full p-2 hover:bg-white/70"
                  >
                    <MdKeyboardArrowLeft className="w-6 h-6" />
                  </button>
                )}

                {currentImageIndex < images.length - 1 && (
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 backdrop-blur-sm bg-white/50 rounded-full p-2 hover:bg-white/70"
                  >
                    <MdKeyboardArrowRight className="w-6 h-6" />
                  </button>
                )}

                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={toggleFavorite}
                    className="backdrop-blur-sm bg-white/50 rounded-full p-3 hover:bg-white/70 transition-colors"
                  >
                    {isFavorite ? (
                      <MdFavorite className="w-5 h-5 text-red-500" />
                    ) : (
                      <MdFavoriteBorder className="w-5 h-5 text-gray-800" />
                    )}
                  </button>
                  <button
                    onClick={handleShare}
                    className="backdrop-blur-sm bg-white/50 rounded-full p-3 hover:bg-white/70 transition-colors"
                  >
                    <MdShare className="w-5 h-5 text-gray-800" />
                  </button>
                </div>

                {/* ADD THIS - Image Counter for Desktop */}
                <div className="absolute bottom-4 right-4">
                  <div className="backdrop-blur-sm bg-white/50 rounded-full px-3 py-2">
                    <span className="text-sm font-medium text-gray-800">
                      {currentImageIndex + 1} of {images.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImageIndex === index
                        ? "border-blue-500"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Details Sidebar - 40% */}
            <div className="w-2/5 bg-white rounded-xl p-6 h-fit">
              {/* Status and Location */}
              <div className="flex flex-wrap gap-2 mb-4">
                {hotel.status.map((status, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                      status === "For Sale" ? "bg-green-500" : "bg-blue-500"
                    }`}
                  >
                    {status}
                  </span>
                ))}
              </div>

              <div className="flex items-center mb-6">
                <MdLocationOn className="w-5 h-5 text-gray-600 mr-2" />
                <h1 className="text-2xl font-bold text-gray-800">
                  {hotel.city}, {hotel.country}
                </h1>
              </div>

              {/* Price */}
              {hotel.price && (
                <div className="mb-6">
                  <div className="text-3xl font-bold text-gray-900">
                    ${hotel.price}
                    <span className="text-lg text-gray-500 font-normal">
                      /night
                    </span>
                  </div>
                </div>
              )}

              {/* Property Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <MdHome className="w-5 h-5 text-gray-600 mr-2" />
                  <div>
                    <div className="text-sm text-gray-600">Type</div>
                    <div className="font-semibold">{hotel.type}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <MdLayers className="w-5 h-5 text-gray-600 mr-2" />
                  <div>
                    <div className="text-sm text-gray-600">Floors</div>
                    <div className="font-semibold">
                      {hotel.floorCount} floors
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <MdHome className="w-5 h-5 text-gray-600 mr-2" />
                  <div>
                    <div className="text-sm text-gray-600">Rooms</div>
                    <div className="font-semibold">
                      {getRoomDisplay(hotel.roomNumber)} rooms
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <MdSquareFoot className="w-5 h-5 text-gray-600 mr-2" />
                  <div>
                    <div className="text-sm text-gray-600">Area</div>
                    <div className="font-semibold">{hotel.baseSquare} m²</div>
                  </div>
                </div>
              </div>

              {/* Urgency Marketing */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <MdInfo className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />
                  <div>
                    <p className="text-orange-800 font-medium text-sm mb-1">
                      Only {availableProperties} similar properties available
                    </p>
                    <p className="text-orange-700 text-xs">
                      Properties like this sell within 30 days
                    </p>
                  </div>
                </div>
              </div>

              {/* Call-to-Action Buttons */}
              <div className="space-y-3 mb-6">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  Request Tour
                </button>
                <button className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors">
                  Contact Agent
                </button>
              </div>

              {/* Quick Actions */}
              <div className="flex justify-center space-x-4 mb-6">
                <button className="flex items-center justify-center w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors">
                  <FaWhatsapp className="w-6 h-6" />
                </button>
                <button className="flex items-center justify-center w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors">
                  <MdPhone className="w-6 h-6" />
                </button>
                <button className="flex items-center justify-center w-12 h-12 bg-gray-500 hover:bg-gray-600 text-white rounded-full transition-colors">
                  <MdEmail className="w-6 h-6" />
                </button>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {hotel.description}
                </p>
              </div>

              {/* Amenities */}
              {hotel.amenities && hotel.amenities.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Share Toast */}
      {showShareToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg z-50">
          URL copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default HotelDetails;
