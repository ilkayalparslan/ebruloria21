import { useState } from "react";
import Navigation from "../components/Navigation";

function SellForm() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    countryCode: "+90",
    propertyName: "",
    roomNumber: "",
    floorCount: "",
    roomCategories: "",
    city: "",
    country: "",
    status: "",
    baseSquare: "",
    amenities: [],
    message: "",
  });

  const [errors, setErrors] = useState({});

  const countryCodes = [
    { code: "+90", flag: "🇹🇷", country: "TR" },
    { code: "+1", flag: "🇺🇸", country: "US" },
    { code: "+1", flag: "🇨🇦", country: "CA" },
    { code: "+44", flag: "🇬🇧", country: "UK" },
    { code: "+49", flag: "🇩🇪", country: "DE" },
    { code: "+33", flag: "🇫🇷", country: "FR" },
    { code: "+994", flag: "🇦🇿", country: "AZ" },
    { code: "+34", flag: "🇪🇸", country: "ES" },
    { code: "+39", flag: "🇮🇹", country: "IT" },
    { code: "+966", flag: "🇸🇦", country: "SA" },
    { code: "+974", flag: "🇶🇦", country: "QA" },
    { code: "+20", flag: "🇪🇬", country: "EG" },
    { code: "+971", flag: "🇦🇪", country: "AE" },
    { code: "+965", flag: "🇰🇼", country: "KW" },
    { code: "+973", flag: "🇧🇭", country: "BH" },
    { code: "+968", flag: "🇴🇲", country: "OM" },
    { code: "+962", flag: "🇯🇴", country: "JO" },
    { code: "+961", flag: "🇱🇧", country: "LB" },
  ];

  const amenitiesList = [
    { id: "meeting_room", label: "Meeting Room", icon: "🏢" },
    { id: "swimming_pool", label: "Swimming Pool", icon: "🏊" },
    { id: "parking", label: "Parking Area", icon: "🚗" },
    { id: "gym", label: "Gym", icon: "💪" },
    { id: "garden", label: "Garden", icon: "🌳" },
    { id: "balcony", label: "Balcony", icon: "🏠" },
    { id: "elevator", label: "Elevator", icon: "🛗" },
    { id: "security", label: "Security", icon: "🔒" },
  ];

  const statusOptions = [
    { id: "for_sale", label: "For Sale", icon: "💰" },
    { id: "for_rent", label: "For Rent", icon: "🏠" },
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleAmenityToggle = (amenityId) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter((id) => id !== amenityId)
        : [...prev.amenities, amenityId],
    }));
  };

  const handleStatusToggle = (statusId) => {
    setFormData((prev) => ({
      ...prev,
      status: prev.status === statusId ? "" : statusId,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.surname.trim()) newErrors.surname = "Surname is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.propertyName.trim())
      newErrors.propertyName = "Property name is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      alert("Form submitted successfully! We will contact you via email.");
    }
  };

  return (
    <>
      <Navigation />
      <div className="bg-gradient-to-br from-slate-50 to-slate-200 min-h-screen py-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 md:p-12 shadow-2xl font-inter">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent mb-3 tracking-tight">
              List Your Property
            </h1>
            <p className="text-gray-600 max-w-lg mx-auto leading-relaxed">
              Fill out the form below and we'll help you showcase your property
              to potential buyers or renters.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="mb-12 p-6 md:p-8 bg-slate-50 rounded-2xl border border-slate-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                👤 Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full p-3 text-base border-2 rounded-xl bg-white transition-all duration-300 outline-none ${
                      errors.name
                        ? "border-red-400 bg-red-50"
                        : "border-slate-300 focus:border-blue-500"
                    }`}
                    placeholder="Enter your first name"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Surname *
                  </label>
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    className={`w-full p-3 text-base border-2 rounded-xl bg-white transition-all duration-300 outline-none ${
                      errors.surname
                        ? "border-red-400 bg-red-50"
                        : "border-slate-300 focus:border-blue-500"
                    }`}
                    placeholder="Enter your last name"
                  />
                  {errors.surname && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {errors.surname}
                    </span>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full p-3 text-base border-2 rounded-xl bg-white transition-all duration-300 outline-none ${
                      errors.email
                        ? "border-red-400 bg-red-50"
                        : "border-slate-300 focus:border-blue-500"
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Phone Number *
                  </label>
                  <div
                    className={`flex border-2 rounded-xl bg-white overflow-hidden ${
                      errors.phone
                        ? "border-red-400 bg-red-50"
                        : "border-slate-300 focus-within:border-blue-500"
                    }`}
                  >
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      className="p-1 text-sm bg-transparent border-none outline-none cursor-pointer min-w-8 max-w-18"
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </select>
                    <div className="w-px bg-slate-300"></div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone number"
                      className="flex-1 p-3 text-base bg-transparent border-none outline-none"
                    />
                  </div>
                  {errors.phone && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Property Information */}
            <div className="mb-12 p-6 md:p-8 bg-slate-50 rounded-2xl border border-slate-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                🏠 Property Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="md:col-span-2 lg:col-span-3">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Property Name *
                  </label>
                  <input
                    type="text"
                    name="propertyName"
                    value={formData.propertyName}
                    onChange={handleInputChange}
                    className={`w-full p-3 text-base border-2 rounded-xl bg-white transition-all duration-300 outline-none ${
                      errors.propertyName
                        ? "border-red-400 bg-red-50"
                        : "border-slate-300 focus:border-blue-500"
                    }`}
                    placeholder="e.g., Sunset Villa, Downtown Apartment"
                  />
                  {errors.propertyName && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {errors.propertyName}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Number of Rooms
                  </label>
                  <input
                    type="number"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleInputChange}
                    className="w-full p-3 text-base border-2 border-slate-300 rounded-xl bg-white transition-all duration-300 outline-none focus:border-blue-500"
                    placeholder="0"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Floor Count
                  </label>
                  <input
                    type="number"
                    name="floorCount"
                    value={formData.floorCount}
                    onChange={handleInputChange}
                    className="w-full p-3 text-base border-2 border-slate-300 rounded-xl bg-white transition-all duration-300 outline-none focus:border-blue-500"
                    placeholder="0"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Base Square (m²)
                  </label>
                  <input
                    type="number"
                    name="baseSquare"
                    value={formData.baseSquare}
                    onChange={handleInputChange}
                    className="w-full p-3 text-base border-2 border-slate-300 rounded-xl bg-white transition-all duration-300 outline-none focus:border-blue-500"
                    placeholder="0"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Room Categories
                  </label>
                  <input
                    type="text"
                    name="roomCategories"
                    value={formData.roomCategories}
                    onChange={handleInputChange}
                    placeholder="e.g., 3+1, Studio, Penthouse"
                    className="w-full p-3 text-base border-2 border-slate-300 rounded-xl bg-white transition-all duration-300 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full p-3 text-base border-2 border-slate-300 rounded-xl bg-white transition-all duration-300 outline-none focus:border-blue-500"
                    placeholder="Enter city name"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full p-3 text-base border-2 border-slate-300 rounded-xl bg-white transition-all duration-300 outline-none focus:border-blue-500"
                    placeholder="Enter country name"
                  />
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="mb-12 p-6 md:p-8 bg-slate-50 rounded-2xl border border-slate-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                📋 Property Status
              </h3>
              <div className="flex gap-4 flex-wrap">
                {statusOptions.map((status) => (
                  <div
                    key={status.id}
                    onClick={() => handleStatusToggle(status.id)}
                    className={`p-4 flex-1 rounded-xl cursor-pointer text-center min-w-36 font-semibold transition-all duration-300 ${
                      formData.status === status.id
                        ? "bg-blue-600 text-white border-2 border-blue-600 shadow-lg shadow-blue-600/25"
                        : "bg-white text-gray-700 border-2 border-slate-300 hover:border-blue-300 shadow-sm"
                    }`}
                  >
                    <div className="text-2xl mb-2">{status.icon}</div>
                    {status.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-12 p-6 md:p-8 bg-slate-50 rounded-2xl border border-slate-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                ✨ Amenities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {amenitiesList.map((amenity) => (
                  <div
                    key={amenity.id}
                    onClick={() => handleAmenityToggle(amenity.id)}
                    className={`p-4 rounded-xl cursor-pointer text-center text-sm font-semibold transition-all duration-300 ${
                      formData.amenities.includes(amenity.id)
                        ? "bg-blue-600 text-white border-2 border-blue-600 shadow-lg shadow-blue-600/25"
                        : "bg-white text-gray-700 border-2 border-slate-300 hover:border-blue-300 shadow-sm"
                    }`}
                  >
                    <div className="text-2xl mb-3">{amenity.icon}</div>
                    {amenity.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Message */}
            <div className="mb-12 p-6 md:p-8 bg-slate-50 rounded-2xl border border-slate-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                💬 Additional Information
              </h3>
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us more about your property, special features, pricing expectations, or any other relevant information..."
                  className="w-full p-3 text-base border-2 border-slate-300 rounded-xl bg-white transition-all duration-300 outline-none focus:border-blue-500 min-h-32 resize-y leading-relaxed"
                />
                <p className="text-sm text-gray-600 mt-2 italic">
                  This information will help us better understand your property
                  and requirements.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-12 py-4 text-lg font-semibold rounded-xl cursor-pointer transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5 tracking-wide"
              >
                Submit Property Listing
              </button>
              <p className="text-sm text-gray-600 mt-4 max-w-md mx-auto">
                We'll review your submission and get back to you within 24 hours
                via email.
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SellForm;
