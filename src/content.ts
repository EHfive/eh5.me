import { getCollection, CollectionEntry } from "astro:content";
import { groupCollectionBySubSlug } from "~/utils";
import type { Language } from "./i18n";

export const allPosts = (await getCollection("blog")).sort(
  (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
);

export const allPostsGroupBySubSlug = groupCollectionBySubSlug(allPosts);

export interface EntryExtra {
  fallback: boolean;
  lang: string;
  origLang: string;
  subSlug: string;
}
export type CollectionEntryExtra = CollectionEntry<"blog"> & EntryExtra;

const allPostsByLangCache: Record<string, CollectionEntryExtra[]> = {};

export function allPostsFilterByLang(lang: string): CollectionEntryExtra[] {
  if (allPostsByLangCache[lang]) {
    return allPostsByLangCache[lang];
  }
  const posts = Object.entries(allPostsGroupBySubSlug).map(
    ([subSlug, dict]) => {
      const langs = [lang, "en", "zh-cn", ...Object.keys(dict!)] as Language[];
      for (const origLang of langs) {
        const post = dict![origLang!];
        if (!post) continue;
        return {
          ...post,
          fallback: origLang !== lang,
          lang,
          origLang,
          subSlug,
        };
      }
      throw new Error();
    }
  );
  allPostsByLangCache[lang] = posts;
  return posts;
}

export function isNotDraft(entry: CollectionEntry<"blog">): boolean {
  return !entry.data.draft;
}
