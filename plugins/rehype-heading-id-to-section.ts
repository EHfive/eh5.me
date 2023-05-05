// Credit: https://github.com/jake-low/remark-sectionize/issues/5#issuecomment-1058737483

import { visit } from "unist-util-visit";
import type { Root, Element } from "hast";
import type { Plugin } from "unified";

const HEADINGS = ["h1", "h2", "h3", "h4", "h5", "h6"];

const plugin: Plugin<[], Root> = () => {
  return (tree) => {
    visit(
      tree,
      (node) =>
        node.type === "element" && (node as Element).tagName === "section",
      (node) => {
        update(node as Element);
      }
    );
  };
};

function update(section: Element) {
  let heading;
  if (
    !(
      Array.isArray(section.children) &&
      (heading = section.children[0]) &&
      heading.type === "element" &&
      HEADINGS.includes(heading.tagName) &&
      heading.properties?.id
    )
  ) {
    return;
  }

  const { id, ...rest } = heading.properties;
  section.properties = {
    ...section.properties,
    id,
  };
  heading.properties = rest;
}

export default plugin;
