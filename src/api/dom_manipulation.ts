import { CSSStyle, StylesGroup } from "../types";

export function applyStyle(className: string, styles: CSSStyle) {
  const entries = [
    ...(document.getElementsByClassName(
      className
    ) as HTMLCollectionOf<HTMLElement>),
  ];
  entries.forEach((el: HTMLElement) => {
    Object.assign(el.style, styles);
  });
}

export function applyStyles(styles: StylesGroup) {
  Object.entries(styles).forEach(([key, style]) => applyStyle(key, style));
}
