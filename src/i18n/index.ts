import i18n from "i18next";

import { initReactI18next } from "react-i18next";
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

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
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
    lng: "ka",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });
