import { createSignal, createMemo, onMount, onCleanup } from "solid-js";
import type { MarkdownHeading } from "astro";
export interface IToc {
  heading: MarkdownHeading;
  children?: IToc[];
}

export default function Toc(props: { toc: IToc[] }) {
  const [activeHeading, setActiveHeading] = createSignal<string[]>([]);

  onMount(() => {
    const ratios: Record<string, number | undefined> = {};
    const headingsObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target.id) {
            ratios[entry.target.id] = entry.intersectionRatio;
          }
        }
        setActiveHeading(
          Object.entries(ratios)
            .filter(([, ratio]) => ratio)
            .map(([id]) => id)
        );
      },
      {
        rootMargin: "-60px 0% -60%",
      }
    );

    document
      .querySelectorAll("main section[id]")
      .forEach((h) => headingsObserver.observe(h));

    onCleanup(() => headingsObserver.disconnect());
  });

  function _Toc(props: { toc: IToc[]; depth: number }) {
    const depth = createMemo(() => props.depth);
    return (
      <ul>
        {props.toc.map(({ heading, children }) => (
          <li class="flex flex-col">
            <a
              href={`#${heading.slug}`}
              class="transition border-l-4 border-base-content/10 hover:border-primary hover:bg-base-content/10 py-3"
              classList={{
                "pl-4": depth() === 0,
                "pl-8": depth() === 1,
                "pl-12": depth() === 2,
                "pl-16": depth() >= 3,
                "!border-accent": activeHeading().includes(heading.slug),
              }}
            >
              {heading.text}
            </a>
            {Array.isArray(children) && children.length && (
              <_Toc depth={depth() + 1} toc={children} />
            )}
          </li>
        ))}
      </ul>
    );
  }

  return <_Toc toc={props.toc} depth={0} />;
}
