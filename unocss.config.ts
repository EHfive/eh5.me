import {
  defineConfig,
  presetIcons,
  presetUno,
  presetTypography,
  transformerDirectives,
} from "unocss";
import { presetDaisy } from "unocss-preset-daisy";

import fs from "fs/promises";

const resetFile = require.resolve("@unocss/reset/tailwind.css");

const daisyConfig: Parameters<typeof presetDaisy>[0] = {
  themes: [
    {
      // https://github.com/nordtheme/nord
      // Nord Remix Light
      light: {
        primary: "#88C0D0", // nord8
        "primary-content": "#ECEFF4", // nord6
        secondary: "#5E81AC", // nord10
        "secondary-content": "#ECEFF4", // nord6
        accent: "#81A1C1", // nord9
        "accent-content": "#ECEFF4", // nord6
        neutral: "#3B4252", // nord1
        "neutral-content": "#D8DEE9", // nord4
        "base-100": "#FFFFFF", // white
        "base-200": "#ECEFF4", // nord6
        "base-300": "#E5E9F0", // nord5
        "base-content": "#2E3440", // nord0
        info: "#B48EAD", // nord15
        success: "#A3BE8C", // nord14
        warning: "#EBCB8B", // nord13
        error: "#BF616A", // nord11,
        "--animation-btn": "0",
      },
    },
    {
      // Nord Remix Dark
      dark: {
        primary: "#88C0D0", // nord8
        "primary-content": "#ECEFF4", // nord6
        secondary: "#5E81AC", // nord10
        "secondary-content": "#ECEFF4", // nord6
        accent: "#81A1C1", // nord9
        "accent-content": "#ECEFF4", // nord6
        neutral: "#3B4252", // nord1
        "neutral-content": "#D8DEE9", // nord4
        "base-100": "#2E3440", // nord0
        "base-200": "#292E39", // nordtheme.com
        "base-300": "#242933", // nordtheme.com
        "base-content": "#D8DEE9", // nord4
        info: "#B48EAD", // nord15
        success: "#A3BE8C", // nord14
        warning: "#EBCB8B", // nord13
        error: "#BF616A", // nord11
        "--animation-btn": "0",
      },
    },
  ],
};

const HEADINGS = ["h1", "h2", "h3", "h4", "h5", "h6"];

function hs(suffix: string) {
  return HEADINGS.map((tag) => `${tag}${suffix}`).join(",");
}

const typographyOptions: Parameters<typeof presetTypography>[0] = {
  cssExtend: {
    h1: {
      "font-size": "1.875em",
    },
    h2: {
      "font-size": "1.5em",
    },
    h3: {
      "font-size": "1.25em",
    },
    a: {
      "text-decoration": "underline transparent 1px",
      color: "hsl(var(--nf))",
      "transition-duration": ".075s",
      "transition-property": "text-decoration-color",
      "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
    },
    "a:hover": {
      "text-decoration-color": "hsl(var(--nf))",
    },
    img: {
      margin: "0 auto",
    },
    "pre, code": {
      "word-break": "inherit",
      "word-wrap": "break-word",
      "overflow-wrap": "inherit",
    },
    ":not(pre) > code::before,:not(pre) > code::after": {
      content: "initial",
    },
    "p code, li code": {
      "white-space": "pre-wrap",
      "background-color": "hsla(var(--b3), 0.6)",
      padding: ".2em .4em",
      "border-radius": "6px",
    },
    "pre .language-id": {
      display: "none",
    },
    [hs(" a")]: {
      "text-decoration": "none",
      color: "inherit",
    },
    [hs("> a::after")]: {
      content: `"#"`,
      color: "hsl(var(--b3))",
      "padding-left": ".5rem",
      "transition-duration": ".15s",
      "transition-property": "color",
      "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
    },
    [hs(":hover > a::after")]: {
      color: "hsl(var(--p))",
    },
  },
};

export default defineConfig({
  theme: {
    colors: {
      blog: {
        100: "hsla(var(--bc),.1)",
        200: "hsla(var(--bc),.2)",
        300: "hsla(var(--bc),.3)",
        400: "hsla(var(--bc),.5)",
        500: "hsla(var(--bc),.7)",
        600: "hsla(var(--bc),.9)",
        700: "hsl(var(--bc))",
        800: "hsl(var(--bc))",
        900: "hsl(var(--bc))",
      },
    },
  },
  presets: [
    presetDaisy(daisyConfig),
    presetIcons(),
    presetUno(),
    presetTypography(typographyOptions),
  ],
  transformers: [transformerDirectives()],
  preflights: [
    {
      async getCSS() {
        const reset = await fs.readFile(resetFile);
        return reset.toString();
      },
    },
  ],
});
