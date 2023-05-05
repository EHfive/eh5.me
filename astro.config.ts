import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import solidJs from "@astrojs/solid-js";
import unoCSS from "unocss/astro";
import sitemap from "@astrojs/sitemap";
import i18n from "astro-i18n";
import compressor from "astro-compressor";
import astroLocal from "./plugins/astro-local";

import remarkDirective from "remark-directive";
import remarkDirectiveHint from "./plugins/remark-directive-hint";
import remarkGithub from "remark-github";
import remarkShikiTwoslash from "remark-shiki-twoslash";
import type { Options as TwoSlashOptions } from "remark-shiki-twoslash";
import remarkSectionize from "remark-sectionize";

import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import type { Options as AutolinkOptions } from "rehype-autolink-headings";
import rehypeHeadingIdsToSection from "./plugins/rehype-heading-id-to-section";
import rehypeExternalLinks from "rehype-external-links";
import type { Options as ExternalLinksOptions } from "rehype-external-links";

const twoslashOptions: TwoSlashOptions = {
  theme: "nord",
  includeJSDocInHover: true,
};
const autolinkOptions: AutolinkOptions = {
  behavior: "wrap",
};
const externalLinksOptions: ExternalLinksOptions = {
  rel: ["external", "nofollow"],
  content: [],
  contentProperties: {
    class: "i-ic-baseline-launch inline-block w-4 h-4 ml-1",
  },
};

const toCompress = [
  ".css",
  ".js",
  ".json",
  ".html",
  ".xml",
  ".cjs",
  ".mjs",
  ".svg",
];

// https://astro.build/config
export default defineConfig({
  site: "https://eh5.me",
  integrations: [
    astroLocal(),
    unoCSS({
      injectReset: false,
    }),
    solidJs(),
    mdx(),
    sitemap(),
    i18n(),
    compressor({ fileExtensions: toCompress }),
  ],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [
      remarkDirective,
      remarkDirectiveHint,
      remarkGithub,
      [remarkShikiTwoslash as any, twoslashOptions],
      remarkSectionize,
    ],
    rehypePlugins: [
      rehypeHeadingIds,
      [rehypeAutolinkHeadings, autolinkOptions],
      rehypeHeadingIdsToSection,
      [rehypeExternalLinks, externalLinksOptions],
    ],
  },
  experimental: {
    assets: true,
  },
});
