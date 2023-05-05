/// <reference path="../.astro/types.d.ts" />
/// <reference path="../.astro-i18n/generated.d.ts" />
/// <reference types="astro/client-image" />

declare module "astro-i18n" {
  import i18n from "astro-i18n";
  export default i18n;
}

declare module "remark-sectionize" {
  export default {} as any;
}

// import type { AttributifyAttributes } from "@unocss/preset-attributify";

// declare global {
//   namespace astroHTML.JSX {
//     interface HTMLAttributes extends AttributifyAttributes {}
//   }
// }

// declare module "solid-js" {
//   namespace JSX {
//     interface HTMLAttributes<T> extends AttributifyAttributes {}
//   }
// }
