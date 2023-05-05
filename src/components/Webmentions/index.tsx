import { createResource, Show, createMemo, For, Suspense } from "solid-js";
import type { WmioFeed, WmioEntry } from "./types";
import WmComment from "./Comment";

const mock: WmioFeed = {
  type: "feed",
  name: "webmentions",
  children: [
    {
      type: "entry",
      author: {
        type: "card",
        name: "Huang-Huang Bao",
        photo: "",
        url: "https://eh5.me/",
      },
      url: "https://eh5.me/zh-tw/blog/new-start-2023/",
      published: "2023-04-18T00:00:00",
      "wm-received": "2023-05-04T08:08:07Z",
      "wm-id": 1670183,
      "wm-source": "https://eh5.me/zh-tw/blog/new-start-2023/",
      "wm-target": "https://eh5.me/",
      name: "新個人網站",
      content: {
        html: '<p>將包括部落格、專案展示、筆記/程式碼 snippet 頁</p>\n<h2><a href="https://eh5.me/zh-tw/blog/new-start-2023/#stage-1">Stage 1</a></h2><p>完成基礎內容框架</p><ul><li> I18N 路由</li>\n<li> Tag 頁</li>\n<li> I18N fallback to English or Chinese</li>\n<li> 繁體中文轉換 ( <a href="https://github.com/BYVoid/OpenCC">OpenCC<span></span></a> )</li>\n<li> UI I18N</li>\n<li> 文章內容樣式最佳化</li>\n<li><a href="https://indiewebify.me">IndieWebify<span></span></a></li>\n<li><a href="https://webmention.io">Webmention.io<span></span></a> 整合評論</li>\n<li> 為 fallback 項新增 class、CSS var 定義 <code>display</code> 樣式, 以允許根據標籤（<code>[data-fallback=""]</code>）或 CSS var style 控制顯示與否</li>\n<li> 頁內導航元素補充</li>\n<li> 底部文章推薦導航</li>\n<li> 文章系列</li>\n</ul><h2><a href="https://eh5.me/zh-tw/blog/new-start-2023/#stage-2">Stage 2</a></h2><p>當前介面借鑑<del>抄襲</del>了 <a href="https://github.com/importantimport/urara">Urara<span></span></a> 和 <a href="https://kwaa.dev">kwaa.dev<span></span></a>，因為我覺得比較直觀、漂亮</p><p>後續將重新設計網站介面，表現個人風格</p>',
        text: '將包括部落格、專案展示、筆記/程式碼 snippet 頁\nStage 1完成基礎內容框架 I18N 路由\n Tag 頁\n I18N fallback to English or Chinese\n 繁體中文轉換 ( OpenCC )\n UI I18N\n 文章內容樣式最佳化\nIndieWebify\nWebmention.io 整合評論\n 為 fallback 項新增 class、CSS var 定義 display 樣式, 以允許根據標籤（[data-fallback=""]）或 CSS var style 控制顯示與否\n 頁內導航元素補充\n 底部文章推薦導航\n 文章系列\nStage 2當前介面借鑑抄襲了 Urara 和 kwaa.dev，因為我覺得比較直觀、漂亮後續將重新設計網站介面，表現個人風格',
      },
      "in-reply-to": "https://eh5.me/",
      "wm-property": "in-reply-to",
      "wm-private": false,
    },
    {
      type: "entry",
      author: {
        type: "card",
        name: "Huang-Huang Bao",
        photo: "",
        url: "https://eh5.me/",
      },
      url: "https://eh5.me/zh-tw/blog/new-start-2023/",
      published: "2023-04-18T00:00:00",
      "wm-received": "2023-05-04T08:08:07Z",
      "wm-id": 1670183,
      "wm-source": "https://eh5.me/zh-tw/blog/new-start-2023/",
      "wm-target": "https://eh5.me/",
      name: "新個人網站",
      content: {
        html: "ssssss",
        text: "xxxxxx",
      },
      "mention-of": "https://eh5.me/",
      "wm-property": "mention-of",
      "wm-private": false,
    },
  ],
};

export default function Webmentions(props: { targets: string[] }) {
  const [data] = createResource(
    () => props.targets,
    async (targets) => {
      const url = new URL("https://webmention.io/api/mentions.jf2");
      for (const target of targets) {
        url.searchParams.append("target[]", target);
      }
      const res = await fetch(url);
      const data = (await res.json()) as WmioFeed;
      return data;
    }
  );

  // const data = () => mock;

  const comments = createMemo(
    () =>
      data()?.children.filter((i) => i["wm-property"] === "in-reply-to") ||
      ([] as WmioEntry<"in-reply-to">[])
  );

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <div class="space-y-4">
        <For each={comments()}>
          {(entry) => (
            <WmComment
              author={entry.author.name}
              authorPhoto={entry.author.photo}
              authorUrl={entry.author.url}
              date={new Date(entry.published)}
              url={entry.url}
              content={entry.content.html}
            />
          )}
        </For>
      </div>
      <form method="post" action="https://webmention.io/eh5.me/webmention">
        <input
          type="hidden"
          name="target"
          value="https://eh5.me/"
        ></input>
        <label class="text-sm label" for="wm-source">Send Webmentions:</label>
        <div class="flex gap-2">
          <input
            class="flex-1 input input-bordered focus:input-primary w-full"
            type="text"
            id="wm-source"
            name="source"
            placeholder="https://example.com/my-post"
          ></input>
          <button
            class="btn btn-primary flex-none mt-auto"
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
    </Suspense>
  );
}
