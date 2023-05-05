import type { APIRoute } from "astro";
import feed from "~/feed";

export const get: APIRoute = async () => {
  return {
    body: feed.rss2(),
  };
};
