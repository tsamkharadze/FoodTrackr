import i18n from "i18next";

import { initReactI18next } from "react-i18next";
import headerEn from "./en/header.json";
import headerKa from "./ka/header.json";
import loginKa from "./ka/login.json";
import loginEn from "./en/login.json";
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      ka: {
        translation: {
          "header-trans": headerKa,
          "login-trans": loginKa,
        },
      },
      en: {
        translation: { "header-trans": headerEn, "login-trans": loginEn },
      },
    },
    lng: "ka",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });
