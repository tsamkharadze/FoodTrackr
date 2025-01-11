import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LngDetector from "i18next-browser-languagedetector";

import headerEn from "./en/header.json";
import headerKa from "./ka/header.json";
import loginKa from "./ka/login.json";
import loginEn from "./en/login.json";
import registerKa from "./ka/register.json";
import registerEn from "./en/register.json";
import profileKa from "./ka/profile.json";
import profileEn from "./en/profile.json";
import ErrorEn from "./en/errors.json";
import ErrorKa from "./ka/errors.json";

// Initialize language detector before i18next
const languageDetector = new LngDetector();
languageDetector.init({
  order: ["localStorage", "navigator"],
  lookupLocalStorage: "i18nextLng",
  caches: ["localStorage"],
  checkWhitelist: true,
});

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ka: {
        translation: {
          "header-trans": headerKa,
          "login-trans": loginKa,
          "register-trans": registerKa,
          "profile-translation": profileKa,
          "error-translation": ErrorKa,
        },
      },
      en: {
        translation: {
          "header-trans": headerEn,
          "login-trans": loginEn,
          "register-trans": registerEn,
          "profile-translation": profileEn,
          "error-translation": ErrorEn,
        },
      },
    },
    fallbackLng: "en",
    supportedLngs: ["ka", "en"],
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

// Handle language changes
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  localStorage.setItem("i18nextLng", lng);
});

export default i18n;
