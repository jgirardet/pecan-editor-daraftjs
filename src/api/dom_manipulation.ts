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
  styles.forEach((s) => sh.insertRule(cssObjToString(s!)));
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

export function getCssClassAttribute(
  classname: string,
  attr: string
): string | undefined {
  const sh = getPecanStyleSheet();
  const cls = ([...sh.cssRules] as CSSStyleRule[]).filter(
    (x) => x.selectorText === classname
  )[0];
  if (cls !== undefined) {
    return { ...cls.style }[attr] as string;
  }
}
