interface WmioObj extends Record<string, any> {
  type: string;
}

export interface WmioFeed extends WmioObj {
  type: "feed";
  name: "webmentions";
  children: WmioEntryT[];
}

export type WmioEntry<P extends string> = {
  [key in P]: string;
} & {
  type: "entry";
  name: string;
  author: WmioCard;
  url: string;
  published: string;
  content: {
    html: string;
    text: string;
  };
  "wm-received": string;
  "wm-id": number;
  "wm-source": string;
  "wm-target": string;
  "wm-property": P;
  "wm-private": boolean;
};

export type WmioEntryT =
  | WmioEntry<"in-reply-to">
  | WmioEntry<"like-of">
  | WmioEntry<"repost-of">
  | WmioEntry<"bookmark-of">
  | WmioEntry<"mention-of">
  | WmioEntry<"rsvp">;

export interface WmioCard extends WmioObj {
  type: "card";
  name: string;
  photo: string;
  url: string;
}
