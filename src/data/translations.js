import { useLanguage } from "./languageContext.jsx";

export const translations = {
  en: {
    // Navigation
    homes: "Homes",
    hotels: "Hotels",
    signIn: "Sign In",
    sellOn: "Sell on Ebruloria",
    search: "Search...",

    // Home1 component content
    home1Title: "Discover Your Perfect Stay",
    home1Subtitle:
      "Find unique accommodations and unforgettable experiences around the world. Whether you're looking for a cozy apartment or a luxury villa, we connect you with the perfect place to call home.",
    getStarted: "Get Started",
    liveDemo: "Live Demo →",
  },
  tr: {
    // Navigation
    homes: "Evler",
    hotels: "Oteller",
    signIn: "Giriş Yap",
    sellOn: "Ebruloria'da Sat",
    search: "Ara...",

    // Home1 component content
    home1Title: "Mükemmel Konaklamanızı Keşfedin",
    home1Subtitle:
      "Dünya çapında benzersiz konaklama yerleri ve unutulmaz deneyimler bulun. Rahat bir daire arıyor olun ya da lüks bir villa, sizi ev diyebileceğiniz mükemmel yerle buluşturuyoruz.",
    getStarted: "Başlayın",
    liveDemo: "Canlı Demo →",
  },
  ar: {
    // Navigation
    homes: "المنازل",
    hotels: "الفنادق",
    signIn: "تسجيل الدخول",
    sellOn: "البيع على إبرولوريا",
    search: "بحث...",

    // Home1 component content
    home1Title: "اكتشف إقامتك المثالية",
    home1Subtitle:
      "اعثر على أماكن إقامة فريدة وتجارب لا تُنسى حول العالم. سواء كنت تبحث عن شقة مريحة أو فيلا فاخرة، نحن نربطك بالمكان المثالي لتسميه بيتك.",
    getStarted: "ابدأ",
    liveDemo: "عرض مباشر ←",
  },
};

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key) => translations[language][key] || key;

  return { t };
};
