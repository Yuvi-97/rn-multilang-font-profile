import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import translationEn from "./locales/ec-US/translation.json"
import translationZh from "./locales/zh-CN/translation.json";
import translationGu from "./locales/gu-IN/translation.json";
import translationTa from "./locales/ta-IN/translation.json";
import translationHi from "./locales/hi-IN/translation.json";
import translationTe from "./locales/te-IN/translation.json";
import translationMl from "./locales/ml-IN/translation.json";

const resources = {
  "en-US": { translation: translationEn },
  "zh-CN": { translation: translationZh },
  "gu-IN": { translation: translationGu },
  "ta-IN": { translation: translationTa },
  "hi-IN": { translation: translationHi },
  "te-IN": { translation: translationTe },
  "ml-IN": { translation: translationMl },
};
const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem("language");

  if (!savedLanguage) {
    savedLanguage = Localization.locale;
  }

  i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage,
    fallbackLng: "en-US",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
