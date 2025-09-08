import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../data/translations";
import Navigation from "../components/Navigation";
import {
  MdArrowBack,
  MdCloudUpload,
  MdDelete,
  MdHome,
  MdLocationOn,
  MdSquareFoot,
  MdPhone,
  MdEmail,
  MdCheckCircle,
  MdError,
  MdHotel,
  MdLayers,
} from "react-icons/md";

const SellForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    // Property Details
    type: "",
    title: "",
    description: "",
    price: "",
    currency: "USD",
    status: [],
    
    // Location
    country: "",
    city: "",
    district: "",
    address: "",
    
    // Property Specs
    baseSquare: "",
    roomNumber: "",
    floorCount: "",
    buildingAge: "",
    
    // Contact Info
    ownerName: "",
    ownerSurname: "",
    email: "",
    phone: "",
    
    // Additional
    amenities: [],
    furnished: "",
    availableFrom: "",
  });
  
  const [images, setImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle checkbox changes for arrays (status, amenities)
  const handleArrayChange = (name, value, checked) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked 
        ? [...prev[name], value]
        : prev[name].filter(item => item !== value)
    }));
  };

  // Handle image upload
  const handleImageUpload = (files) => {
    const newImages = Array.from(files).map(file => ({
      file,
      url: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9)
    }));
    
    setImages(prev => [...prev, ...newImages].slice(0, 20)); // Max 20 images
  };

  // Handle drag and drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  // Remove image
  const removeImage = (imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
  };

  // Form validation
  const validateForm = () => {
    const required = ['type', 'title', 'price', 'country', 'city', 'address', 'baseSquare', 'roomNumber', 'floorCount', 'ownerName', 'ownerSurname', 'email', 'phone'];
    return required.every(field => formData[field]) && formData.status.length > 0 && images.length > 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert(t("pleaseFillAllFields") || "Please fill all required fields and upload at least one image");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create FormData for file upload
      const submitData = new FormData();
      
      // Add form fields
      Object.keys(formData).forEach(key => {
        if (Array.isArray(formData[key])) {
          submitData.append(key, JSON.stringify(formData[key]));
        } else {
          submitData.append(key, formData[key]);
        }
      });
      
      // Add images
      images.forEach((image, index) => {
        submitData.append(`images[${index}]`, image.file);
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      
      // Redirect after success
      setTimeout(() => {
        navigate('/');
      }, 3000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Property type options
  const propertyTypes = [
    { value: "apartment", label: t("apartment") || "Apartment" },
    { value: "villa", label: t("villa") || "Villa" },
    { value: "house", label: t("house") || "House" },
    { value: "office", label: t("office") || "Office" },
    { value: "shop", label: t("shop") || "Shop" },
    { value: "hotel", label: t("hotel") || "Hotel" },
    { value: "land", label: t("land") || "Land" },
    { value: "warehouse", label: t("warehouse") || "Warehouse" },
  ];

  const statusOptions = [
    { value: "For Sale", label: t("forSale") },
    { value: "For Rent", label: t("forRent") },
  ];

  const amenitiesOptions = [
    "Swimming Pool", "Gym", "Parking", "Garden", "Balcony", "Terrace", 
    "Elevator", "Security", "Air Conditioning", "Heating", "Internet", 
    "Pet Friendly", "Sea View", "Mountain View", "Near Metro", "Shopping Mall"
  ];

  const countries = ["Turkey", "Germany", "UAE", "USA", "UK", "France", "Italy", "Spain"];
  const cities = {
    Turkey: ["Istanbul", "Ankara", "Antalya", "Bodrum", "Izmir", "Bursa"],
    Germany: ["Berlin", "Munich", "Hamburg", "Frankfurt"],
    UAE: ["Dubai", "Abu Dhabi", "Sharjah"],
    USA: ["New York", "Los Angeles", "Chicago", "Miami"],
    UK: ["London", "Manchester", "Birmingham"],
    France: ["Paris", "Lyon", "Marseille"],
    Italy: ["Rome", "Milan", "Naples"],
    Spain: ["Madrid", "Barcelona", "Valencia"]
  };

  // Success/Error Modal
  if (submitStatus) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 max-w-md w-full text-center shadow-lg">
          {submitStatus === 'success' ? (
            <>
              <MdCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {t("propertySubmitted") || "Property Submitted Successfully!"}
              </h2>
              <p className="text-gray-600 mb-6">
                {t("propertyReviewMessage") || "Your property has been submitted for review. We'll contact you within 24 hours."}
              </p>
              <div className="animate-pulse text-blue-600 font-medium">
                {t("redirectingHome") || "Redirecting to homepage..."}
              </div>
            </>
          ) : (
            <>
              <MdError className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {t("submissionError") || "Submission Error"}
              </h2>
              <p className="text-gray-600 mb-6">
                {t("submissionErrorMessage") || "Something went wrong. Please try again."}
              </p>
              <button
                onClick={() => setSubmitStatus(null)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {t("tryAgain") || "Try Again"}
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Modified Navigation */}
      <Navigation 
        sellButtonText={t("goBack") || "Go Back"} 
        sellButtonAction={() => navigate('/')} 
      />
      
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {t("sellYourProperty") || "Sell Your Property"}
          </h1>
          <p className="text-gray-600">
            {t("sellPropertyDescription") || "List your property on EbruLoria and reach thousands of potential buyers"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-8">
          
          {/* Property Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center border-b pb-2">
              <MdHome className="w-6 h-6 mr-2 text-blue-600" />
              {t("propertyInformation") || "Property Information"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("propertyType") || "Property Type"} *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">{t("selectType") || "Select Type"}</option>
                  {propertyTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("status") || "Status"} *
                </label>
                <div className="flex gap-4 pt-2">
                  {statusOptions.map(status => (
                    <label key={status.value} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.status.includes(status.value)}
                        onChange={(e) => handleArrayChange('status', status.value, e.target.checked)}
                        className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                      />
                      {status.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("propertyTitle") || "Property Title"} *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder={t("enterPropertyTitle") || "e.g., Luxury 3+1 Apartment in Beşiktaş"}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("description") || "Description"}
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder={t("enterDescription") || "Describe your property, features, neighborhood, etc."}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("price") || "Price"} *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("currency") || "Currency"} *
                </label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="TRY">TRY (₺)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center border-b pb-2">
              <MdLocationOn className="w-6 h-6 mr-2 text-blue-600" />
              {t("location") || "Location"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("country") || "Country"} *
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">{t("selectCountry") || "Select Country"}</option>
                  {countries.map(country => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("city") || "City"} *
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">{t("selectCity") || "Select City"}</option>
                  {formData.country && cities[formData.country]?.map(city => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("district") || "District"}
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                placeholder={t("enterDistrict") || "e.g., Beşiktaş, Kadıköy"}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("address") || "Address"} *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder={t("enterAddress") || "Full address of the property"}
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Property Details */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center border-b pb-2">
              <MdSquareFoot className="w-6 h-6 mr-2 text-blue-600" />
              {t("propertyDetails") || "Property Details"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("area") || "Area"} (m²) *
                </label>
                <input
                  type="number"
                  name="baseSquare"
                  value={formData.baseSquare}
                  onChange={handleInputChange}
                  placeholder="120"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("rooms") || "Rooms"} *
                </label>
                <select
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">{t("selectRooms") || "Select Rooms"}</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>
                      {num} {t("rooms") || "Rooms"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("floors") || "Floors"} *
                </label>
                <input
                  type="number"
                  name="floorCount"
                  value={formData.floorCount}
                  onChange={handleInputChange}
                  placeholder="1"
                  min="1"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("buildingAge") || "Building Age"} ({t("years") || "years"})
                </label>
                <input
                  type="number"
                  name="buildingAge"
                  value={formData.buildingAge}
                  onChange={handleInputChange}
                  placeholder="5"
                  min="0"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("furnished") || "Furnished"}
                </label>
                <select
                  name="furnished"
                  value={formData.furnished}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">{t("selectFurnished") || "Select Option"}</option>
                  <option value="yes">{t("yes") || "Yes"}</option>
                  <option value="no">{t("no") || "No"}</option>
                  <option value="partial">{t("partial") || "Partially"}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("amenities") || "Amenities"}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {amenitiesOptions.map(amenity => (
                  <label key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={(e) => handleArrayChange('amenities', amenity, e.target.checked)}
                      className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="text-sm">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center border-b pb-2">
              <MdPhone className="w-6 h-6 mr-2 text-blue-600" />
              {t("contactInformation") || "Contact Information"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("firstName") || "First Name"} *
                </label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  placeholder={t("enterFirstName") || "Your first name"}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("lastName") || "Last Name"} *
                </label>
                <input
                  type="text"
                  name="ownerSurname"
                  value={formData.ownerSurname}
                  onChange={handleInputChange}
                  placeholder={t("enterLastName") || "Your last name"}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("emailAddress") || "Email Address"} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t("enterEmail") || "your.email@example.com"}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("phoneNumber") || "Phone Number"} *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={t("enterPhone") || "+90 555 123 45 67"}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("availableFrom") || "Available From"}
              </label>
              <input
                type="date"
                name="availableFrom"
                value={formData.availableFrom}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center border-b pb-2">
              <MdCloudUpload className="w-6 h-6 mr-2 text-blue-600" />
              {t("uploadImages") || "Upload Images"} *
            </h2>

            {/* Image Upload Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <MdCloudUpload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">
                {t("dragDropImages") || "Drag and drop images here"}
              </p>
              <p className="text-gray-500 mb-4">
                {t("orClickToSelect") || "or click to select files"}
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files)}
                className="hidden"
                id="imageUpload"
              />
              <label
                htmlFor="imageUpload"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold cursor-pointer transition-colors inline-block"
              >
                {t("selectImages") || "Select Images"}
              </label>
              <p className="text-sm text-gray-500 mt-4">
                {t("maxImages") || "Maximum 20 images, JPG, PNG, or WEBP format"}
              </p>
            </div>

            {/* Image Preview */}
            {images.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-4">
                  {t("uploadedImages") || "Uploaded Images"} ({images.length}/20)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {images.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.url}
                        alt="Property"
                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MdDelete className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting || !validateForm()}
              className={`px-8 py-3 rounded-lg font-semibold text-white transition-colors ${
                isSubmitting || !validateForm()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {t("submitting") || "Submitting..."}
                </div>
              ) : (
                t("submitProperty") || "Submit Property"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellForm;