export default function WmComment(props: {
  author: string;
  authorPhoto?: string;
  authorUrl?: string;
  url: string;
  date: Date;
  content: string;
}) {
  return (
    <div class="p-comment h-cite">
      <div class="flex gap-4">
        <img
          loading="lazy"
          decoding="async"
          class="w-12 h-12 rounded"
          src={
            props.authorPhoto ||
            `https://ui-avatars.com/api/?format=svg&background=random&name=${encodeURIComponent(
              props.author
            )}`
          }
        ></img>
        <div class="flex-1 rounded border-accent/50">
          <div class="flex flex-col">
            <a class="font-bold text-base-content" href={props.authorUrl}>{props.author}</a>
            <a class="text-sm text-base-content/80" href={props.url}>
              <time datetime={props.date.toISOString()}>
                {props.date.toLocaleDateString()}
              </time>
            </a>
          </div>

          <div class="prose prose-blog max-w-full text-sm py-2" innerHTML={props.content}></div>
        </div>
      </div>
    </div>
  );
}
