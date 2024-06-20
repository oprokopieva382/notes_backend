import i18next from "i18next";
import error from "./locales/en/error.json";
import errorMessage from "./locales/en/error-message.json";

i18next.init({
  debug: true, 
  fallbackLng: "en", // Default language if no language detected
  defaultNS: "ns1",
  resources: {
    en: {
      ns1: error,
      ns2: errorMessage,
    },
  },
});

export default i18next;
