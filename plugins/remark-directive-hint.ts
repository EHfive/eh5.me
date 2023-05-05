import { visit } from "unist-util-visit";
import type { Root } from "mdast";
import type { Plugin } from "unified";
import type { Directive } from "mdast-util-directive";

const plugin: Plugin<[], Root> = () => {
  return (tree) => {
    visit(
      tree,
      (node) =>
        ["textDirective", "leafDirective", "containerDirective"].includes(
          node.type
        ) && ["note", "warn", "error"].includes((node as Directive).name),
      (node) => {
        update(node as Directive);
      }
    );
  };
};

const infoMap = {
  note: {
    class: "bg-success text-success-content",
  },
  warn: {
    class: "bg-warning text-warning-content",
  },
  error: {
    class: "bg-error text-error-content",
  },
};

type HintType = keyof typeof infoMap;

function update(node: Directive) {
  const data = node.data || (node.data = {});
  const info = infoMap[node.name as HintType];
  if (node.type === "textDirective") {
    data.hName = "span";
    data.hProperties = {
      class: `${info.class}`,
    };
  } else {
    data.hName = "div";
    data.hProperties = {
      class: `rounded px-6 py-1 my-4 flow-root ${info.class}`,
    };
  }
}

export default plugin;
