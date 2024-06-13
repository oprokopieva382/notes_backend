import error from "../locales/en/error.json";
import errorMessage from "../locales/en/error-message.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: 'ns1',
    resources: {
      ns1: typeof error;
      ns2: typeof errorMessage;
    };
  }
}
