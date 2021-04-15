import { DraftStyleMap } from "draft-js";
import { StylesDefaultsType } from "../types";

function toNumberString(num: number) {
  if (Number.isInteger(num)) {
    return num + ".0";
  } else {
    return num.toString();
  }
}

export const buildFontSizeDefaults = (sizes: number[]): DraftStyleMap => {
  let res: DraftStyleMap = {};
  sizes.forEach((x) => {
    const ns = toNumberString(x);
    res[`FONTSIZE_${ns}`] = { fontSize: ns + "em" };
  });
  return res;
};

export const buildCustomStyleMap = (
  styles: StylesDefaultsType
): DraftStyleMap => {
  return {
    // ...styles.blockStyles,
    ...styles.defaultColors,
    ...styles.defaultFontSizes,
  };
};
