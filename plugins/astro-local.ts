import type { AstroIntegration } from "astro";
import { fileURLToPath } from "url";

export default function (): AstroIntegration {
  return {
    name: "eh5-me-website",
    hooks: {
      "astro:config:setup": ({ injectScript, command, isRestart }) => {},
    },
  };
}
