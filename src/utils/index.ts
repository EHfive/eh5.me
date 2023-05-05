import type { CollectionEntry } from "astro:content";
import type { Language } from "~/i18n";

export function getLanguageFromURL(pathname: string) {
  const langCodeMatch = pathname.match(/\/([a-z]{2}-?[a-z]{0,2})\//);
  return langCodeMatch ? langCodeMatch[1] : "zh-cn";
}

/** Remove \ and / from beginning of string */
export function removeLeadingSlash(path: string) {
  return path.replace(/^[/\\]+/, "");
}

/** Remove \ and / from end of string */
export function removeTrailingSlash(path: string) {
  return path.replace(/[/\\]+$/, "");
}

export function splitLangFromSlug(slug: string): [Language, string] {
  const pos = slug.indexOf("/");
  if (pos === -1) {
    throw new Error(slug);
  }
  const lang = slug.substring(0, pos) as Language;
  const subSlug = slug.substring(pos + 1);
  return [lang, subSlug];
}

export function tagsFromPosts(posts: CollectionEntry<"blog">[]) {
  const tagSet = new Set<string>();
  for (const { data } of posts) {
    data.tags.forEach((tag) => tagSet.add(tag));
  }
  return Array.from(tagSet);
}

export function tagCountFromPosts(posts: CollectionEntry<"blog">[]) {
  const tagCount: Record<string, number | undefined> = {};
  for (const { data } of posts) {
    for (const tag of data.tags) {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    }
  }
  return tagCount;
}

export function groupCollectionBySubSlug(entries: CollectionEntry<"blog">[]) {
  const posts: Record<
    string,
    Record<Language, CollectionEntry<"blog"> | undefined> | undefined
  > = {};
  for (const entry of entries) {
    const [lang, subSlug] = splitLangFromSlug(entry.slug);
    posts[subSlug] = {
      ...posts[subSlug],
      [lang]: entry,
    } as any;
  }
  return posts;
}
