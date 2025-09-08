import { useLanguage } from "./languageContext";

export const translations = {
  en: {
    homes: "Homes",
    hotels: "Hotels",
    signIn: "Sign In",
    sellOn: "Sell on Ebruloria",
    search: "Search...",
  },
  tr: {
    homes: "Evler",
    hotels: "Oteller",
    signIn: "Giriş Yap",
    sellOn: "Ebruloria'da Sat",
    search: "Ara...",
  },
  ar: {
    homes: "المنازل",
    hotels: "الفنادق",
    signIn: "تسجيل الدخول",
    sellOn: "البيع على إبرولوريا",
    search: "بحث...",
  },
};

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key) => translations[language][key] || key;

  return { t };
};
