import {
  argbFromHex,
  themeFromSourceColor,
  applyTheme,
} from "@material/material-color-utilities";

const theme = themeFromSourceColor(argbFromHex("#f82506"), [
  {
    name: "custom-1",
    value: argbFromHex("#ff0000"),
    blend: true,
  },
]);

console.log(JSON.stringify(theme, null, 2));
