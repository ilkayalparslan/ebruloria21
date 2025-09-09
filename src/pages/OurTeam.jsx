import React from "react";
import Navigation from "../components/Navigation";
import { FiInstagram, FiLinkedin, FiMail } from "react-icons/fi";

const OurTeam = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Chief Executive Officer",
      bio: "With over 15 years in real estate and hospitality, Sarah leads our vision of connecting people with exceptional properties worldwide.",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
      social: {
        instagram: "#",
        linkedin: "#",
        email: "sarah@ebruloria.com",
      },
    },
    {
      id: 2,
      name: "Marcus Williams",
      position: "Director of Sales",
      bio: "Marcus brings a decade of luxury real estate expertise, specializing in high-end property transactions and client relationship management.",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
      social: {
        instagram: "#",
        linkedin: "#",
        email: "marcus@ebruloria.com",
      },
    },
    {
      id: 3,
      name: "Isabella Chen",
      position: "Head of Design & Architecture",
      bio: "Isabella transforms spaces with her innovative design vision, creating stunning interiors that perfectly complement each property's unique character.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
      social: {
        instagram: "#",
        linkedin: "#",
        email: "isabella@ebruloria.com",
      },
    },
    {
      id: 4,
      name: "Alexander Rodriguez",
      position: "Investment Advisor",
      bio: "Alexander guides clients through strategic property investments, leveraging market insights and financial expertise to maximize returns.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      social: {
        instagram: "#",
        linkedin: "#",
        email: "alexander@ebruloria.com",
      },
    },
    {
      id: 5,
      name: "Sophia Kim",
      position: "International Relations Manager",
      bio: "Sophia facilitates global property transactions and cultural bridge-building, ensuring seamless experiences for our international clientele.",
      image:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=400&fit=crop&crop=face",
      social: {
        instagram: "#",
        linkedin: "#",
        email: "sophia@ebruloria.com",
      },
    },
    {
      id: 6,
      name: "Ryan Thompson",
      position: "Technology & Innovation Lead",
      bio: "Ryan pioneers cutting-edge PropTech solutions, developing smart property management systems and enhancing digital customer experiences.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      social: {
        instagram: "#",
        linkedin: "#",
        email: "ryan@ebruloria.com",
      },
    },
  ];

  const getCardDesign = (member, index) => {
    const designs = [
      // Design 1: Classic Overlay
      <div
        key={member.id}
        className="relative group overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500"
      >
        <div className="relative h-96 overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
          <p className="text-blue-300 font-semibold mb-3">{member.position}</p>
          <p className="text-white/90 text-sm leading-relaxed mb-4">
            {member.bio}
          </p>
          <div className="flex space-x-3">
            <a
              href={member.social.instagram}
              className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
            >
              <FiInstagram size={18} />
            </a>
            <a
              href={member.social.linkedin}
              className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
            >
              <FiLinkedin size={18} />
            </a>
            <a
              href={`mailto:${member.social.email}`}
              className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              <FiMail size={18} />
            </a>
          </div>
        </div>
      </div>,

      // Design 2: Circular Profile Card
      // <div
      //   key={member.id}
      //   className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group p-8"
      // >
      //   <div className="flex flex-col items-center text-center">
      //     {/* Circular Image with Instagram-style Border */}
      //     <div className="relative mb-6">
      //       <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 p-1">
      //         <div className="w-full h-full rounded-full bg-white p-1">
      //           <img
      //             src={member.image}
      //             alt={member.name}
      //             className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105"
      //           />
      //         </div>
      //       </div>
      //     </div>

      //     {/* Content Stacked */}
      //     <div className="flex flex-col items-center space-y-3">
      //       <h3 className="text-2xl font-bold text-gray-800">{member.name}</h3>
      //       <p className="text-blue-600 font-semibold text-lg">
      //         {member.position}
      //       </p>
      //       <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
      //         {member.bio}
      //       </p>

      //       {/* Social Icons */}
      //       <div className="flex space-x-4 pt-4">
      //         <a
      //           href={member.social.instagram}
      //           className="w-12 h-12 bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-200 transform hover:scale-110"
      //         >
      //           <FiInstagram size={20} />
      //         </a>
      //         <a
      //           href={member.social.linkedin}
      //           className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 hover:shadow-lg transition-all duration-200 transform hover:scale-110"
      //         >
      //           <FiLinkedin size={20} />
      //         </a>
      //         <a
      //           href={`mailto:${member.social.email}`}
      //           className="w-12 h-12 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 hover:shadow-lg transition-all duration-200 transform hover:scale-110"
      //         >
      //           <FiMail size={20} />
      //         </a>
      //       </div>
      //     </div>
      //   </div>
      // </div>,

      // Design 3: Floating Card
      // <div key={member.id} className="relative group">
      //   <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-4">
      //     <div className="h-64 overflow-hidden">
      //       <img
      //         src={member.image}
      //         alt={member.name}
      //         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      //       />
      //     </div>
      //     <div className="p-6">
      //       <div className="text-center mb-4">
      //         <h3 className="text-xl font-bold text-gray-800 mb-1">
      //           {member.name}
      //         </h3>
      //         <p className="text-blue-600 font-semibold">{member.position}</p>
      //       </div>
      //       <p className="text-gray-600 text-sm leading-relaxed text-center mb-6">
      //         {member.bio}
      //       </p>
      //       <div className="flex justify-center space-x-4">
      //         <a
      //           href={member.social.instagram}
      //           className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-200"
      //         >
      //           <FiInstagram size={20} />
      //         </a>
      //         <a
      //           href={member.social.linkedin}
      //           className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-200"
      //         >
      //           <FiLinkedin size={20} />
      //         </a>
      //         <a
      //           href={`mailto:${member.social.email}`}
      //           className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-200"
      //         >
      //           <FiMail size={20} />
      //         </a>
      //       </div>
      //     </div>
      //   </div>
      // </div>,

      // Design 4: Minimal Elegance
      // <div
      //   key={member.id}
      //   className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
      // >
      //   <div className="relative h-72 overflow-hidden">
      //     <img
      //       src={member.image}
      //       alt={member.name}
      //       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      //     />
      //     <div className="absolute top-4 right-4 flex space-x-2">
      //       <a
      //         href={member.social.instagram}
      //         className="w-8 h-8 bg-white/90 backdrop-blur-sm text-pink-600 rounded-full flex items-center justify-center hover:bg-white transition-colors"
      //       >
      //         <FiInstagram size={14} />
      //       </a>
      //       <a
      //         href={member.social.linkedin}
      //         className="w-8 h-8 bg-white/90 backdrop-blur-sm text-blue-600 rounded-full flex items-center justify-center hover:bg-white transition-colors"
      //       >
      //         <FiLinkedin size={14} />
      //       </a>
      //       <a
      //         href={`mailto:${member.social.email}`}
      //         className="w-8 h-8 bg-white/90 backdrop-blur-sm text-gray-600 rounded-full flex items-center justify-center hover:bg-white transition-colors"
      //       >
      //         <FiMail size={14} />
      //       </a>
      //     </div>
      //   </div>
      //   <div className="p-6">
      //     <h3 className="text-xl font-bold text-gray-800 mb-1">
      //       {member.name}
      //     </h3>
      //     <p className="text-blue-600 font-medium text-sm mb-3">
      //       {member.position}
      //     </p>
      //     <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
      //   </div>
      // </div>,

      // Design 5: Glass Morphism
      // <div key={member.id} className="relative group">
      //   <div className="relative h-full rounded-3xl overflow-hidden">
      //     <img
      //       src={member.image}
      //       alt={member.name}
      //       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      //     />
      //     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      //     <div className="absolute bottom-0 left-0 right-0 p-6">
      //       <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30">
      //         <h3 className="text-xl font-bold text-white mb-1">
      //           {member.name}
      //         </h3>
      //         <p className="text-blue-200 font-semibold text-sm mb-2">
      //           {member.position}
      //         </p>
      //         <p className="text-white/90 text-xs leading-relaxed mb-3">
      //           {member.bio}
      //         </p>
      //         <div className="flex space-x-3">
      //           <a
      //             href={member.social.instagram}
      //             className="w-8 h-8 bg-white/30 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
      //           >
      //             <FiInstagram size={16} />
      //           </a>
      //           <a
      //             href={member.social.linkedin}
      //             className="w-8 h-8 bg-white/30 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
      //           >
      //             <FiLinkedin size={16} />
      //           </a>
      //           <a
      //             href={`mailto:${member.social.email}`}
      //             className="w-8 h-8 bg-white/30 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
      //           >
      //             <FiMail size={16} />
      //           </a>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>,

      // Design 6: Modern Geometric
      // <div key={member.id} className="relative group">
      //   <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
      //     <div className="relative">
      //       <div className="h-64 overflow-hidden">
      //         <img
      //           src={member.image}
      //           alt={member.name}
      //           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      //         />
      //       </div>
      //       <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
      //         <div className="flex space-x-2">
      //           <a
      //             href={member.social.instagram}
      //             className="w-12 h-12 bg-pink-500 text-white rounded-xl flex items-center justify-center hover:bg-pink-600 transition-colors shadow-lg"
      //           >
      //             <FiInstagram size={20} />
      //           </a>
      //           <a
      //             href={member.social.linkedin}
      //             className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg"
      //           >
      //             <FiLinkedin size={20} />
      //           </a>
      //           <a
      //             href={`mailto:${member.social.email}`}
      //             className="w-12 h-12 bg-gray-600 text-white rounded-xl flex items-center justify-center hover:bg-gray-700 transition-colors shadow-lg"
      //           >
      //             <FiMail size={20} />
      //           </a>
      //         </div>
      //       </div>
      //     </div>
      //     <div className="pt-10 pb-6 px-6 text-center">
      //       <h3 className="text-xl font-bold text-gray-800 mb-2">
      //         {member.name}
      //       </h3>
      //       <p className="text-blue-600 font-semibold mb-3">
      //         {member.position}
      //       </p>
      //       <p className="text-gray-600 text-sm leading-relaxed">
      //         {member.bio}
      //       </p>
      //     </div>
      //   </div>
      // </div>,
      // Design 1: Classic Overlay
      <div
        key={member.id}
        className="relative group overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500"
      >
        <div className="relative h-96 overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
          <p className="text-blue-300 font-semibold mb-3">{member.position}</p>
          <p className="text-white/90 text-sm leading-relaxed mb-4">
            {member.bio}
          </p>
          <div className="flex space-x-3">
            <a
              href={member.social.instagram}
              className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
            >
              <FiInstagram size={18} />
            </a>
            <a
              href={member.social.linkedin}
              className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
            >
              <FiLinkedin size={18} />
            </a>
            <a
              href={`mailto:${member.social.email}`}
              className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              <FiMail size={18} />
            </a>
          </div>
        </div>
      </div>,
      // Design 1: Classic Overlay
      <div
        key={member.id}
        className="relative group overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500"
      >
        <div className="relative h-96 overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
          <p className="text-blue-300 font-semibold mb-3">{member.position}</p>
          <p className="text-white/90 text-sm leading-relaxed mb-4">
            {member.bio}
          </p>
          <div className="flex space-x-3">
            <a
              href={member.social.instagram}
              className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
            >
              <FiInstagram size={18} />
            </a>
            <a
              href={member.social.linkedin}
              className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
            >
              <FiLinkedin size={18} />
            </a>
            <a
              href={`mailto:${member.social.email}`}
              className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              <FiMail size={18} />
            </a>
          </div>
        </div>
      </div>,
      // Design 1: Classic Overlay
      <div
        key={member.id}
        className="relative group overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500"
      >
        <div className="relative h-96 overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
          <p className="text-blue-300 font-semibold mb-3">{member.position}</p>
          <p className="text-white/90 text-sm leading-relaxed mb-4">
            {member.bio}
          </p>
          <div className="flex space-x-3">
            <a
              href={member.social.instagram}
              className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
            >
              <FiInstagram size={18} />
            </a>
            <a
              href={member.social.linkedin}
              className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
            >
              <FiLinkedin size={18} />
            </a>
            <a
              href={`mailto:${member.social.email}`}
              className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              <FiMail size={18} />
            </a>
          </div>
        </div>
      </div>,
      // Design 1: Classic Overlay
      <div
        key={member.id}
        className="relative group overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500"
      >
        <div className="relative h-96 overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
          <p className="text-blue-300 font-semibold mb-3">{member.position}</p>
          <p className="text-white/90 text-sm leading-relaxed mb-4">
            {member.bio}
          </p>
          <div className="flex space-x-3">
            <a
              href={member.social.instagram}
              className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
            >
              <FiInstagram size={18} />
            </a>
            <a
              href={member.social.linkedin}
              className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
            >
              <FiLinkedin size={18} />
            </a>
            <a
              href={`mailto:${member.social.email}`}
              className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              <FiMail size={18} />
            </a>
          </div>
        </div>
      </div>,
    ];

    return designs[index];
  };

  return (
    <>
      <Navigation />
      <div className="gradient-primary min-h-screen py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Meet Our Team
            </h1>
            <p className="text-white/90 text-xl max-w-3xl mx-auto leading-relaxed">
              Our passionate team of professionals is dedicated to helping you
              find the perfect property and creating exceptional experiences
              every step of the way.
            </p>
          </div>

          {/* Team Grid - Each card shows a different design */}
          {/* Team Grid - Each card shows a different design */}
          <div className="mb-16">
            {/* First 3 cards in a row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {teamMembers
                .slice(0, 3)
                .map((member, index) => getCardDesign(member, index))}
            </div>

            {/* Last 2 cards centered */}
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
                {teamMembers
                  .slice(3, 5)
                  .map((member, index) => getCardDesign(member, index + 3))}
              </div>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Our team is here to help you find your dream property or
              investment opportunity. Get in touch today to start your journey
              with EbruLoria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary-gradient text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg">
                Contact Our Team
              </button>
              <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-white/30">
                View Properties
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurTeam;
