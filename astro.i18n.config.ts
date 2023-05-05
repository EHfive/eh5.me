import { defineAstroI18nConfig } from "astro-i18n";

export default defineAstroI18nConfig({
  defaultLangCode: "en",
  supportedLangCodes: ["zh-cn", "zh-tw"],
  showDefaultLangCode: true,
  translations: {
    en: "src/i18n/en.json",
    "zh-cn": "src/i18n/zh-cn.json",
    "zh-tw": "src/i18n/zh-tw.json",
  },
  routeTranslations: {},
});
