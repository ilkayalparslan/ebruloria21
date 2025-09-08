import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../data/translations";
import Navigation from "../components/Navigation";
import {
  MdCloudUpload,
  MdDelete,
  MdHome,
  MdLocationOn,
  MdSquareFoot,
  MdPhone,
  MdCheckCircle,
  MdError,
  MdDescription,
} from "react-icons/md";

const SellForm = () => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useTranslation();

  const [formData, setFormData] = useState({
    // Basic Info (matching your JSON structure - excluding auto-generated fields)
    name: "",
    location: "",
    city: "",
    country: "",
    roomNumber: "",
    floorCount: "",
    baseSquare: "",
    status: [], // ["For Sale"] or ["For Rent"]

    // Single language content (will be converted to translations object later)
    description: "",
    type: "",
    amenities: [],

    // Contact Info (seller information - not in JSON but needed)
    ownerName: "",
    ownerSurname: "",
    email: "",
    phone: "",

    // Seller Needs/Expectations (instead of price)
    sellerNeeds: "",
  });

  const [images, setImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle amenity selection
  const handleAmenityChange = (amenity, checked) => {
    setFormData((prev) => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenity]
        : prev.amenities.filter((item) => item !== amenity),
    }));
  };

  // Handle status selection
  const handleArrayChange = (name, value, checked) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked
        ? [...prev[name], value]
        : prev[name].filter((item) => item !== value),
    }));
  };

  // Handle image upload
  const handleImageUpload = (files) => {
    const newImages = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9),
    }));

    setImages((prev) => [...prev, ...newImages].slice(0, 50)); // Max 50 images
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
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  // Form validation
  const validateForm = () => {
    const basicRequired = [
      "name",
      "location",
      "city",
      "country",
      "roomNumber",
      "floorCount",
      "baseSquare",
      "ownerName",
      "ownerSurname",
      "email",
      "phone",
      "sellerNeeds",
      "description",
      "type",
    ];
    const basicValid = basicRequired.every((field) => formData[field]);
    const statusValid = formData.status.length > 0;
    const imagesValid = images.length > 0;

    return basicValid && statusValid && imagesValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert(
        t("pleaseFillAllFields") ||
          "Please fill all required fields and upload at least one image"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the property object matching your JSON structure
      const propertyData = {
        // Auto-generated fields (your system will handle these)
        id: Date.now(), // You'll generate this properly
        adNumber: Math.random().toString().slice(2, 12), // You'll generate this properly
        imageCount: images.length,
        imageFolderName: formData.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
        tier: "standard", // You can set default tier or determine based on other factors

        // Fields from the form
        name: formData.name,
        location: formData.location,
        city: formData.city,
        country: formData.country,
        roomNumber: parseInt(formData.roomNumber),
        floorCount: parseInt(formData.floorCount),
        baseSquare: parseInt(formData.baseSquare),
        status: formData.status,

        // Create translations object with user's language as primary
        translations: {
          [currentLanguage]: {
            description: formData.description,
            type: formData.type,
            amenities: formData.amenities,
          },
          // Other languages will be added by your backend translation service
        },

        // Add metadata about the original language
        originalLanguage: currentLanguage,

        // Seller contact info and needs (separate from property data)
        sellerInfo: {
          ownerName: formData.ownerName,
          ownerSurname: formData.ownerSurname,
          email: formData.email,
          phone: formData.phone,
          sellerNeeds: formData.sellerNeeds,
          submittedAt: new Date().toISOString(),
          preferredLanguage: currentLanguage,
        },
      };

      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("propertyData", JSON.stringify(propertyData));

      // Add images
      images.forEach((image, index) => {
        submitData.append(`images[${index}]`, image.file);
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Property Data to Submit:", propertyData);

      setSubmitStatus("success");

      // Redirect after success
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Property type options based on current language
  const propertyTypes = {
    en: [
      "Luxury Resort",
      "Hotel",
      "Boutique Hotel",
      "Resort",
      "Hostel",
      "Apartment",
      "Villa",
      "House",
      "Office",
      "Shop",
      "Land",
    ],
    tr: [
      "Lüks Tatil Köyü",
      "Otel",
      "Butik Otel",
      "Tatil Köyü",
      "Hostel",
      "Apartman",
      "Villa",
      "Ev",
      "Ofis",
      "Dükkan",
      "Arsa",
    ],
    ar: [
      "منتجع فاخر",
      "فندق",
      "فندق بوتيك",
      "منتجع",
      "نزل",
      "شقة",
      "فيلا",
      "منزل",
      "مكتب",
      "متجر",
      "أرض",
    ],
  };

  const statusOptions = [
    { value: "For Sale", label: t("forSale") || "For Sale" },
    { value: "For Rent", label: t("forRent") || "For Rent" },
  ];

  // Amenities based on current language
  const amenitiesOptions = {
    en: [
      "WiFi",
      "Swimming Pool",
      "Fitness Center",
      "Restaurant",
      "Free Parking",
      "Business Center",
      "Conference Rooms",
      "Spa Services",
      "Room Service",
      "24/7 Reception",
      "Air Conditioning",
      "Heating",
      "Elevator",
      "Garden",
      "Terrace",
      "Beach Access",
      "Airport Shuttle",
      "Pet Friendly",
    ],
    tr: [
      "WiFi",
      "Yüzme Havuzu",
      "Fitness Merkezi",
      "Restoran",
      "Ücretsiz Park",
      "İş Merkezi",
      "Konferans Salonları",
      "Spa Hizmetleri",
      "Oda Servisi",
      "7/24 Resepsiyon",
      "Klima",
      "Isıtma",
      "Asansör",
      "Bahçe",
      "Teras",
      "Plaj Erişimi",
      "Havaalanı Servisi",
      "Evcil Hayvan Dostu",
    ],
    ar: [
      "واي فاي",
      "حمام السباحة",
      "مركز اللياقة",
      "مطعم",
      "موقف مجاني",
      "مركز الأعمال",
      "قاعات المؤتمرات",
      "خدمات السبا",
      "خدمة الغرف",
      "استقبال 7/24",
      "تكييف",
      "تدفئة",
      "مصعد",
      "حديقة",
      "شرفة",
      "الوصول للشاطئ",
      "خدمة المطار",
      "يسمح بالحيوانات",
    ],
  };

  const countries = [
    "Turkey",
    "Germany",
    "UAE",
    "USA",
    "UK",
    "France",
    "Italy",
    "Spain",
  ];
  const cities = {
    Turkey: ["Istanbul", "Ankara", "Antalya", "Bodrum", "Izmir", "Bursa"],
    Germany: ["Berlin", "Munich", "Hamburg", "Frankfurt"],
    UAE: ["Dubai", "Abu Dhabi", "Sharjah"],
    USA: ["New York", "Los Angeles", "Chicago", "Miami"],
    UK: ["London", "Manchester", "Birmingham"],
    France: ["Paris", "Lyon", "Marseille"],
    Italy: ["Rome", "Milan", "Naples"],
    Spain: ["Madrid", "Barcelona", "Valencia"],
  };

  // Success/Error Modal
  if (submitStatus) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 max-w-md w-full text-center shadow-lg">
          {submitStatus === "success" ? (
            <>
              <MdCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {t("propertySubmitted") || "Property Submitted Successfully!"}
              </h2>
              <p className="text-gray-600 mb-6">
                {t("propertyReviewMessage") ||
                  "Your property has been submitted for review. We'll contact you within 24 hours."}
              </p>
              <div className="animate-pulse text-primary font-medium">
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
                {t("submissionErrorMessage") ||
                  "Something went wrong. Please try again."}
              </p>
              <button
                onClick={() => setSubmitStatus(null)}
                className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
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
        sellButtonAction={() => navigate("/")}
      />

      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {t("sellYourProperty") || "List Your Property"}
          </h1>
          <p className="text-gray-600">
            {t("sellPropertyDescription") ||
              "List your property on EbruLoria and reach thousands of potential buyers"}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-6 space-y-8"
        >
          {/* Basic Property Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center border-b pb-2">
              <MdHome className="w-6 h-6 mr-2 text-primary" />
              {t("basicInformation") || "Basic Information"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("propertyName") || "Property Name"} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={
                    t("enterPropertyName") || "e.g., Luxury Beachfront Hotel"
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("status") || "Status"} *
                </label>
                <div className="flex gap-3 pt-2">
                  {statusOptions.map((status) => (
                    <button
                      key={status.value}
                      type="button"
                      onClick={() =>
                        handleArrayChange(
                          "status",
                          status.value,
                          !formData.status.includes(status.value)
                        )
                      }
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 border-2 ${
                        formData.status.includes(status.value)
                          ? "bg-primary text-white border-primary shadow-md"
                          : "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center border-b pb-2">
              <MdLocationOn className="w-6 h-6 mr-2 text-primary" />
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  required
                >
                  <option value="">
                    {t("selectCountry") || "Select Country"}
                  </option>
                  {countries.map((country) => (
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  required
                >
                  <option value="">{t("selectCity") || "Select City"}</option>
                  {formData.country &&
                    cities[formData.country]?.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("locationDistrict") || "Location/District"} *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder={
                  t("enterLocation") || "e.g., Beachfront District, City Center"
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                required
              />
            </div>
          </div>

          {/* Property Details */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center border-b pb-2">
              <MdSquareFoot className="w-6 h-6 mr-2 text-primary" />
              {t("propertyDetails") || "Property Details"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("baseSquare") || "Base Square"} (m²) *
                </label>
                <input
                  type="number"
                  name="baseSquare"
                  value={formData.baseSquare}
                  onChange={handleInputChange}
                  placeholder="65"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("roomNumber") || "Number of Rooms"} *
                </label>
                <input
                  type="number"
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleInputChange}
                  placeholder="50"
                  min="1"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("floorCount") || "Floor Count"} *
                </label>
                <input
                  type="number"
                  name="floorCount"
                  value={formData.floorCount}
                  onChange={handleInputChange}
                  placeholder="5"
                  min="1"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          {/* Property Content - Single Language */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center border-b pb-2">
              <MdDescription className="w-6 h-6 mr-2 text-primary" />
              {t("propertyContent") || "Property Content"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("propertyType") || "Property Type"} *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  required
                >
                  <option value="">{t("selectType") || "Select Type"}</option>
                  {propertyTypes[currentLanguage]?.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("description") || "Description"} *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder={
                    t("enterDetailedDescription") ||
                    "Enter detailed property description, features, location benefits, etc."
                  }
                  rows={8}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("amenities") || "Amenities"}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {amenitiesOptions[currentLanguage]?.map((amenity) => (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() =>
                        handleAmenityChange(
                          amenity,
                          !formData.amenities.includes(amenity)
                        )
                      }
                      className={`px-3 py-2 text-sm rounded-lg font-medium transition-all duration-200 border-2 ${
                        formData.amenities.includes(amenity)
                          ? "bg-primary text-white border-primary shadow-md scale-105"
                          : "bg-primary/5 text-primary border-primary/15 hover:bg-primary/10 hover:border-primary/25"
                      }`}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Seller Needs/Expectations */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center border-b pb-2">
              <MdDescription className="w-6 h-6 mr-2 text-primary" />
              {t("sellerExpectations") || "Your Needs & Expectations"}
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("whatAreYouLookingFor") || "What are you looking for?"} *
              </label>
              <textarea
                name="sellerNeeds"
                value={formData.sellerNeeds}
                onChange={handleInputChange}
                placeholder={
                  t("sellerNeedsPlaceholder") ||
                  "Tell us about your expectations: price range, timeline, specific requirements, negotiation preferences, etc."
                }
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                required
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center border-b pb-2">
              <MdPhone className="w-6 h-6 mr-2 text-primary" />
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center border-b pb-2">
              <MdCloudUpload className="w-6 h-6 mr-2 text-primary" />
              {t("uploadImages") || "Upload Images"} *
            </h2>

            {/* Image Upload Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? "border-primary bg-primary/10"
                  : "border-gray-300 hover:border-primary/50"
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
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-semibold cursor-pointer transition-colors inline-block"
              >
                {t("selectImages") || "Select Images"}
              </label>
              <p className="text-sm text-gray-500 mt-4">
                {t("maxImagesProperty") ||
                  "Upload high-quality images of your property (JPG, PNG, WEBP)"}
              </p>
            </div>

            {/* Image Preview */}
            {images.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-4">
                  {t("uploadedImages") || "Uploaded Images"} ({images.length})
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
              className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
                isSubmitting || !validateForm()
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary shadow-lg hover:shadow-xl"
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
