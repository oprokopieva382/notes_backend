import i18next from "i18next";
import error from "./locales/en/error.json";
import errorMessage from "./locales/en/error-message.json";

// Initialize i18next
i18next.init({
  debug: true, // Enable debug mode if needed
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
