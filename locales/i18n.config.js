import enLocale from "@/locales/en.json";
import ukLocale from "@/locales/uk.json";
export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en: enLocale,
    uk: ukLocale,
  },
}));
