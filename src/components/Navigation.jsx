import React, { useState } from "react";
import { FiSearch, FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLanguage = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  // Check if we're on the hotels page
  const isHotelsPage = location.pathname === "/hotels";

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Left side - Logo */}
          <div
            className={`flex items-center transition-all duration-300 ${
              isSearchExpanded
                ? "md:translate-x-0 -translate-x-full opacity-0 md:opacity-100"
                : "translate-x-0 opacity-100"
            }`}
          >
            <Link
              to="/"
              className="hover:scale-105 transition-transform duration-300"
            >
              <h1 className="text-xl md:text-2xl font-bold text-accent bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent whitespace-nowrap">
                EbruLoria
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Search Container - positioned around search icon */}
            <div className="relative flex items-center">
              {/* Search Input - expands to the left */}
              <input
                type="text"
                placeholder="Search..."
                className={`transition-all duration-300 h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  isSearchExpanded
                    ? "w-64 pl-4 pr-12 opacity-100"
                    : "w-10 pl-4 pr-10 opacity-60"
                }`}
                onClick={!isSearchExpanded ? toggleSearch : undefined}
                autoFocus={isSearchExpanded}
              />
              {/* Search Icon - positioned over the input */}
              <button
                onClick={toggleSearch}
                className={`absolute top-1/2 transform -translate-y-1/2 p-1 text-gray-600 hover:text-primary z-10 ${
                  isSearchExpanded ? "right-2" : "left-1/2 -translate-x-1/2"
                }`}
              >
                <FiSearch size={18} />
              </button>
            </div>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary"
              >
                <span>EN</span>
                <FiChevronDown size={16} />
              </button>
              {isLanguageOpen && (
                <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-md shadow-lg py-2 min-w-[80px]">
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    EN
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    TR
                  </button>
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <Link
              to="/properties"
              className="text-gray-700 hover:text-primary font-medium"
            >
              Homes
            </Link>
            {!isHotelsPage && (
              <Link
                to="/hotels"
                className="text-gray-700 hover:text-primary font-medium"
              >
                Hotels
              </Link>
            )}
            <button className="text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-primary shadow-md">
              Sign In
            </button>
            <button className="bg-gradient-to-r from-primary to-primary-light text-white px-6 py-2 rounded-lg hover:from-primary-dark hover:to-primary font-medium shadow-md transition-all duration-200">
              Sell on Ebruloria
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4 relative z-10">
            {/* Search Container - positioned around search icon */}
            <div className="relative">
              {/* Search Input - expands to the left on mobile to cover logo area */}
              <input
                type="text"
                placeholder="Search..."
                className={`absolute right-0 top-0 transition-all duration-300 h-9 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  isSearchExpanded
                    ? "w-48 pl-3 pr-10 opacity-100"
                    : "w-9 pl-1 pr-8 opacity-60"
                }`}
                onClick={!isSearchExpanded ? toggleSearch : undefined}
                autoFocus={isSearchExpanded}
              />
              {/* Search Icon - positioned over the input */}
              <button
                onClick={toggleSearch}
                className="relative w-9 h-9 flex items-center justify-center text-gray-600 hover:text-primary z-20"
              >
                <FiSearch size={16} />
              </button>
            </div>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary text-sm"
              >
                <span>EN</span>
                <FiChevronDown size={16} />
              </button>
              {isLanguageOpen && (
                <div className="absolute top-full mt-2 right-0 bg-white border border-primary rounded-md shadow-lg py-2 min-w-[80px]">
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    EN
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    TR
                  </button>
                </div>
              )}
            </div>

            {/* Sign In Button */}
            <button className="text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 text-sm bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-primary shadow-md">
              Sign In
            </button>

            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 hover:text-primary"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Close button header */}
          <div className="flex justify-end items-center p-4 border-b border-gray-200">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 hover:text-primary rounded-lg hover:bg-gray-100"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Menu content */}
          <div className="flex-1 px-6 py-6 space-y-6">
            <Link
              to="/properties"
              className="block text-lg font-medium text-gray-700 hover:text-primary"
              onClick={toggleMobileMenu}
            >
              Homes
            </Link>
            {!isHotelsPage && (
              <Link
                to="/hotels"
                className="block text-lg font-medium text-gray-700 hover:text-primary"
                onClick={toggleMobileMenu}
              >
                Hotels
              </Link>
            )}
            <button className="block w-full text-left bg-gradient-to-r from-primary to-primary-light text-white px-4 py-3 rounded-lg hover:from-primary-dark hover:to-primary font-medium shadow-md transition-all duration-200">
              Sell on Ebruloria
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </nav>
  );
};

export default Navigation;
