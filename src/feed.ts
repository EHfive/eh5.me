import { getImage } from "astro:assets";
import { Feed } from "feed";
import { allPosts } from "~/content";
import { splitLangFromSlug } from "~/utils";

const baseUrl = new URL("https://eh5.me/");

const feed = new Feed({
  title: "eh5's Blog",
  description: "My journey learning anything",
  id: baseUrl.toString(),
  link: baseUrl.toString(),
  copyright: "CC BY-SA 4.0",
  feedLinks: {
    rss: new URL("rss.xml", baseUrl).toString(),
    atom: new URL("atom.xml", baseUrl).toString(),
    json: new URL("feed.json", baseUrl).toString(),
  },
  author: {
    name: "Huang-Huang Bao",
    link: baseUrl.toString(),
  },
});

function imageFormatToMimeType(format: string) {
  switch (format) {
    case "jpg":
      return "image/jpeg";
  }
  return `image/${format}`;
}

for (const post of allPosts) {
  const [lang, subSlug] = splitLangFromSlug(post.slug);
  if (!["en", "zh-cn"].includes(lang)) {
    continue;
  }
  const imageRes =
    post.data.image && (await getImage({ src: post.data.image }));
  const link = new URL(`${lang}/blog/${subSlug}/`, baseUrl).toString();

  feed.addItem({
    title: post.data.title,
    id: link,
    link,
    published: post.data.pubDate,
    date: post.data.modDate || post.data.pubDate,
    description: post.data.summary,
    image: imageRes && {
      url: new URL(imageRes.src, baseUrl).toString(),
      type:
        imageRes.options.format &&
        imageFormatToMimeType(imageRes.options.format),
    },
    category: post.data.tags.map((name) => ({ name })),
  });
}

export default feed;
