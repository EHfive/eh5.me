export const languages = ["en", "zh-cn", "zh-tw"] as const;

export type Language = (typeof languages)[number];

export const languageInfo = {
  en: {
    name: "English",
    short: "EN",
    code: "en",
  },
  "zh-cn": {
    name: "简体中文",
    short: "中文",
    code: "zh-CN",
  },
  "zh-tw": {
    name: "繁體中文 (OpenCC)",
    short: "中文",
    code: "zh-TW",
  },
} as const;
