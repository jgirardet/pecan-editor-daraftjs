import { BlockStyle, BlockStyles } from "../types";

export function getPecanStyleSheet(): CSSStyleSheet {
  return [...document.styleSheets].filter((x) => {
    return [...x.cssRules].some((r) => {
      if (r.cssText.startsWith("#pecan-editor-css")) return true;
      else return false;
    });
  })[0];
}

export function ApplyBlockStyles(styles: BlockStyles) {
  const sh = getPecanStyleSheet();
  styles.forEach((s) => sh.insertRule(cssObjToString(s)));
}

export function cssObjToString(style: BlockStyle): string {
  return (
    style.selector +
    "{" +
    Object.entries(style.styles).reduce((prev, [k, v]) => {
      return prev + `${k}:${v};`;
    }, "") +
    "} "
  );
}

// // applyStyles(blockStyles);
// console.log(document.styleSheets);
// const sh = [...document.styleSheets].filter((x) => {
//   return [...x.cssRules].some((r) => {
//     if (r.cssText.startsWith("#pecan-editor-css")) {
//       return true;
//     }
//   });
// })[0];
// sh.insertRule(".pecan-titre1 {color: red;}");
// // console.log(fzef);
