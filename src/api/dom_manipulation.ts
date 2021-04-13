import { DraftStyleMap } from "draft-js";
import { CSSProperties } from "react";

export function applyStyle(className: string, styles: CSSProperties) {
  const entries = [
    ...(document.getElementsByClassName(
      className
    ) as HTMLCollectionOf<HTMLElement>),
  ];
  entries.forEach((el: HTMLElement) => {
    Object.assign(el.style, styles);
  });
}

export function applyStyles(styles: DraftStyleMap) {
  Object.entries(styles).forEach(([key, style]) => applyStyle(key, style));
}
