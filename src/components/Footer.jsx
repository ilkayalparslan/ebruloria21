import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../data/translations";
import {
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-dark text-white py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Link to="/">
                <h3 className="text-3xl font-bold font-inter mb-3 bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer">
                  EbruLoria
                </h3>
              </Link>
              <p className="text-gray-300 leading-relaxed font-inter">
                {t("footerBrandDesc")}
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              <Link
                to="#"
                className="w-12 h-12 bg-primary/20 hover:bg-primary hover:scale-110 rounded-full flex items-center justify-center transition-all duration-300 group"
              >
                <FaInstagram className="text-xl text-primary group-hover:text-white transition-colors duration-300" />
              </Link>
              <Link
                to="#"
                className="w-12 h-12 bg-red-500/20 hover:bg-red-500 hover:scale-110 rounded-full flex items-center justify-center transition-all duration-300 group"
              >
                <FaYoutube className="text-xl text-red-400 group-hover:text-white transition-colors duration-300" />
              </Link>
              <Link
                to="#"
                className="w-12 h-12 bg-gray-500/20 hover:bg-gray-800 hover:scale-110 rounded-full flex items-center justify-center transition-all duration-300 group"
              >
                <FaTwitter className="text-xl text-gray-400 group-hover:text-white transition-colors duration-300" />
              </Link>
              <Link
                to="#"
                className="w-12 h-12 bg-blue-500/20 hover:bg-blue-600 hover:scale-110 rounded-full flex items-center justify-center transition-all duration-300 group"
              >
                <FaLinkedin className="text-xl text-blue-400 group-hover:text-white transition-colors duration-300" />
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-semibold font-inter mb-6 text-primary-light">
              {t("ourServices")}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/properties"
                  className="text-gray-300 hover:text-primary-light transition-colors duration-300 font-inter"
                >
                  {t("residentialProperties")}
                </Link>
              </li>
              <li>
                <Link
                  to="/commercial"
                  className="text-gray-300 hover:text-primary-light transition-colors duration-300 font-inter"
                >
                  {t("commercialRealEstate")}
                </Link>
              </li>
              <li>
                <Link
                  to="/hotels"
                  className="text-gray-300 hover:text-primary-light transition-colors duration-300 font-inter"
                >
                  {t("hotelInvestments")}
                </Link>
              </li>
              <li>
                <Link
                  to="/management"
                  className="text-gray-300 hover:text-primary-light transition-colors duration-300 font-inter"
                >
                  {t("propertyManagement")}
                </Link>
              </li>
              <li>
                <Link
                  to="/consulting"
                  className="text-gray-300 hover:text-primary-light transition-colors duration-300 font-inter"
                >
                  {t("realEstateConsulting")}
                </Link>
              </li>
              <li>
                <Link
                  to="/advisory"
                  className="text-gray-300 hover:text-primary-light transition-colors duration-300 font-inter"
                >
                  {t("investmentAdvisory")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold font-inter mb-6 text-primary-light">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-primary-light transition-colors duration-300 font-inter"
                >
                  {t("aboutUs")}
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  className="text-gray-300 hover:text-primary-light transition-colors duration-300 font-inter"
                >
                  {t("properties")}
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-gray-300 hover:text-primary-light transition-colors duration-300 font-inter"
                >
                  {t("projects")}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-primary-light transition-colors duration-300 font-inter"
                >
                  {t("contact")}
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-300 hover:text-primary-light transition-colors duration-300 font-inter"
                >
                  {t("blog")}
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-gray-300 hover:text-primary-light transition-colors duration-300 font-inter"
                >
                  {t("careers")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold font-inter mb-6 text-primary-light">
              {t("getInTouch")}
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-accent mt-1 flex-shrink-0" />
                <p className="text-gray-300 font-inter whitespace-pre-line">
                  {t("address")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-accent flex-shrink-0" />
                <Link
                  to="tel:+1234567890"
                  className="text-gray-300 hover:text-primary-light transition-colors duration-300 font-inter"
                >
                  +90 (532) 556-11-90
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-accent flex-shrink-0" />
                <Link
                  to="mailto:info@ebruloria.com"
                  className="text-gray-300 hover:text-primary-light transition-colors duration-300 font-inter"
                >
                  info@ebruloria.com
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-primary-dark/30 pt-12 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-2xl font-semibold font-inter mb-4 text-primary-light">
              {t("stayUpdated")}
            </h4>
            <p className="text-gray-300 font-inter mb-6">
              {t("newsletterDesc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t("enterEmail")}
                className="flex-1 px-4 py-3 bg-primary-dark/20 border border-primary-dark/40 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-primary-light focus:ring-2 focus:ring-primary-light/20 font-inter"
              />
              <button className="px-8 py-3 bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-accent text-white font-medium rounded-full transition-all duration-300 hover:scale-105 font-inter">
                {t("subscribe")}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-dark/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 font-inter">{t("copyright")}</p>
            <div className="flex gap-8">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-primary-light transition-colors duration-300 font-inter"
              >
                {t("privacyPolicy")}
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-primary-light transition-colors duration-300 font-inter"
              >
                {t("termsOfService")}
              </Link>
              <Link
                to="/cookies"
                className="text-gray-400 hover:text-primary-light transition-colors duration-300 font-inter"
              >
                {t("cookiePolicy")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-64 h-32 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl -z-10"></div>
    </footer>
  );
};

export default Footer;
