import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "~/locales/en/common.json";
import enNavigation from "~/locales/en/navigation.json";
import jaCommon from "~/locales/ja/common.json";
import jaNavigation from "~/locales/ja/navigation.json";

export const resources = {
  en: {
    common: enCommon,
    navigation: enNavigation,
  },
  ja: {
    common: jaCommon,
    navigation: jaNavigation,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: "ja",
  ns: ["common", "navigation"],
  defaultNS: "common",
  resources,
});
