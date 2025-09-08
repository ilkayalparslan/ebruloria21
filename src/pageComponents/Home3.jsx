import React from "react";
import { useTranslation } from "../data/translations";
import { Link } from "react-router-dom";
import { MdChevronRight, MdArrowForward } from "react-icons/md";

// Import home images
import pic6 from "../assets/images/home/pic-6.jpg";
import pic7 from "../assets/images/home/pic-7.jpg";

function Home3() {
  const { t } = useTranslation();

  return (
    <section className="w-full min-h-screen bg-gray-50 py-20 flex flex-col items-center justify-start relative">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center gap-16">
        {/* Header Section */}
        <div className="text-center max-w-4xl flex flex-col items-center gap-6">
          <h2 className="text-5xl md:text-6xl font-light text-gray-800 font-inter leading-tight tracking-tight">
            {t("home3Title")}
          </h2>
          <p className="text-xl text-gray-600 font-inter leading-relaxed max-w-2xl">
            {t("home3Subtitle")}
          </p>
          <button className="group flex items-center gap-3 text-gray-800 hover:text-primary-dark transition-colors duration-300 text-lg font-medium font-inter mt-4">
            <span>{t("explorePortfolio")}</span>
            <MdArrowForward className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </div>

        {/* Two Main Categories */}
        <div className="w-full flex flex-col lg:flex-row gap-8 max-w-6xl">
          {/* Residential Properties */}
          <Link to="/homes" className="flex-1 group cursor-pointer">
            <div
              className="h-[500px] rounded-3xl overflow-hidden relative shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]"
              style={{
                background: `linear-gradient(135deg, rgba(122, 147, 172, 0.9) 0%, rgba(97, 112, 115, 0.9) 100%), 
                   url('${pic6}') center/cover`,
              }}
            >
              <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
                {/* Top Badge */}
                <div className="self-start">
                  <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                    {t("residential")}
                  </span>
                </div>

                {/* Center Brand */}
                <div className="text-center">
                  <h3 className="text-4xl md:text-5xl font-light font-inter tracking-wider opacity-90">
                    EbruLoria
                  </h3>
                  <p className="text-lg font-inter mt-2 opacity-80">
                    {t("homes")}
                  </p>
                </div>

                {/* Bottom Content */}
                <div className="space-y-3">
                  <h4 className="text-2xl font-semibold font-inter">
                    {t("modernLiving")}
                  </h4>
                  <p className="text-white/90 font-inter leading-relaxed">
                    {t("modernLivingDesc")}
                  </p>
                  <div className="flex items-center gap-2 text-primary-light">
                    <span className="text-sm font-medium">
                      {t("viewProperties")}
                    </span>
                    <MdChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Hotel & Commercial Properties */}
          <Link to="/hotels" className="flex-1 group cursor-pointer">
            <div
              className="h-[500px] rounded-3xl overflow-hidden relative shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]"
              style={{
                background: `linear-gradient(135deg, rgba(175, 179, 247, 0.9) 0%, rgba(182, 186, 248, 0.9) 100%), 
                   url('${pic7}') center/cover`,
              }}
            >
              <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
                {/* Top Badge */}
                <div className="self-start">
                  <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                    {t("commercial")}
                  </span>
                </div>

                {/* Center Brand */}
                <div className="text-center">
                  <h3 className="text-4xl md:text-5xl font-light font-inter tracking-wider opacity-90">
                    EbruLoria
                  </h3>
                  <p className="text-lg font-inter mt-2 opacity-80">
                    {t("hotels")}
                  </p>
                </div>

                {/* Bottom Content */}
                <div className="space-y-3">
                  <h4 className="text-2xl font-semibold font-inter">
                    {t("luxuryHotels")}
                  </h4>
                  <p className="text-white/90 font-inter leading-relaxed">
                    {t("luxuryHotelsDesc")}
                  </p>
                  <div className="flex items-center gap-2 text-accent-light">
                    <span className="text-sm font-medium">
                      {t("viewHotels")}
                    </span>
                    <MdChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Bottom Stats Section */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-dark mb-2 font-inter">
              500+
            </div>
            <div className="text-gray-600 font-inter">
              {t("propertiesSold")}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-dark mb-2 font-inter">
              15+
            </div>
            <div className="text-gray-600 font-inter">
              {t("yearsExperience")}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-dark mb-2 font-inter">
              98%
            </div>
            <div className="text-gray-600 font-inter">
              {t("clientSatisfaction")}
            </div>
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 max-w-3xl">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 font-inter">
            {t("readyToFind")}
          </h3>
          <p className="text-gray-600 mb-6 font-inter">
            {t("readyToFindDesc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-medium transition-colors duration-300 font-inter">
              {t("scheduleConsultation")}
            </button>
            <button className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-medium transition-all duration-300 font-inter">
              {t("browseListings")}
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-40 left-20 w-24 h-24 bg-primary-light/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-40 right-20 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>
    </section>
  );
}

export default Home3;
