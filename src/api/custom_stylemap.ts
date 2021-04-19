import { DraftStyleMap } from "draft-js";
import { StylesDefaultsType } from "../types";

function toNumberString(num: number) {
  if (Number.isInteger(num)) {
    return num + ".0";
  } else {
    return num.toString();
  }
}

export const buildCustomStyleMap = (
  styles: StylesDefaultsType
): DraftStyleMap => {
  return {
    // ...styles.blockStyles,
    ...styles.defaultColors,
    // ...styles.defaultFontSizes,
  };
};
