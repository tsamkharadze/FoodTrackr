import i18n from "@/i18n";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LanguageGuard: React.FC = () => {
  const navigate = useNavigate();
  const lang = i18n.language;

  useEffect(() => {
    const language = window.location.pathname.split("/")[1];

    if (language !== "ka" && language !== "en") {
      const currentPath = window.location.pathname
        .split("/")
        .slice(2)
        .join("/");
      navigate(`/${lang}/${currentPath}`, { replace: true });
    }
  }, [navigate, lang]);

  return null;
};

export default LanguageGuard;
