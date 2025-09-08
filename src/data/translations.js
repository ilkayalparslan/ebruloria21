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
    home1Title: "Here, every opportunity is for you to stay one step ahead",
    home1Subtitle:
      "With our vision that transcends boundaries, our world-class portfolio, and professional consultancy; we open a new door for you in the investment world.",
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
    home1Title: "Burada her fırsat, bir adım öne geçmeniz için",
    home1Subtitle:
      "Sınırları aşan vizyonumuz, dünya standartlarında portföyümüz ve profesyonel danışmanlığımızla; yatırım dünyasında size yeni bir kapı açıyoruz.",
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
    home1Title: "هنا، كل فرصة لتكون خطوة للأمام",
    home1Subtitle:
      "برؤيتنا التي تتجاوز الحدود ومحفظتنا بالمعايير العالمية واستشاراتنا المهنية؛ نفتح لك باباً جديداً في عالم الاستثمار.",
    getStarted: "ابدأ",
    liveDemo: "عرض مباشر ←",
  },
};

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key) => translations[language][key] || key;

  return { t };
};
