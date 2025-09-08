import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Check saved preference first
    const saved = localStorage.getItem("language");
    if (saved) return saved;

    // Fallback to browser language
    const browser = navigator.language.split("-")[0];
    if (["en", "tr", "ar"].includes(browser)) return browser;

    // Default to English
    return "en";
  });

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
