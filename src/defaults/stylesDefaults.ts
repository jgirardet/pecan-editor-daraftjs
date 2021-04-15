import { DraftStyleMap } from "draft-js";
import { buildFontSizeDefaults } from "../api/custom_stylemap";
import { BlockStyles, StylesDefaultsType } from "../types";

export const defaultFontFamily = "verdana";

export const defaultBlockStyles: BlockStyles = [
  {
    selector: ".pecan-titre1",
    styles: {
      color: "#FF3860",
      "text-decoration-line": "underline",
      "text-decoration-style": "solid",
      "text-decoration-color": "#FF3860",
      "text-transform": "uppercase",
      "font-size": "2.5em",
      "font-weight": "500",
      "font-family": defaultFontFamily,
    },
  },
  {
    selector: ".pecan-titre2",
    styles: {
      color: "#15b168",
      "text-decoration-line": "underline",
      "text-decoration-style": "solid",
      "text-decoration-color": "#15b168",
      "text-transform": "capitalize",
      "font-size": "2.3em",
      "font-weight": "500",
      "font-family": defaultFontFamily,
    },
  },
  {
    selector: ".pecan-titre3",
    styles: {
      color: "#044cd3",
      "text-decoration-line": "underline",
      "text-decoration-style": "solid",
      "text-decoration-color": "#044cd3",
      "font-size": "2.1em",
      "font-weight": "500",
      "font-family": defaultFontFamily,
    },
  },
  {
    selector: ".pecan-titre4",
    styles: {
      color: "#faad1d",
      "text-decoration-line": "underline",
      "text-decoration-style": "solid",
      "text-decoration-color": "#faad1d",
      "font-size": "1.9em",
      "font-weight": "500",
      "font-family": defaultFontFamily,
    },
  },
  {
    selector: ".pecan-unstyled",
    styles: {
      color: "#444444",
      "font-size": "1.3em",
      "font-weight": "200",
      "font-family": defaultFontFamily,
    },
  },
];

export const DefaultColors: DraftStyleMap = {
  COLOR__1: {
    color: "#FF3860",
  },
  COLOR__2: {
    color: "#15b168",
  },
  COLOR__3: {
    color: "#044cd3",
  },
  COLOR__4: {
    color: "#faad1d",
  },
};

export const em_font_sizes = [
  0.2,
  0.5,
  0.6,
  0.7,
  0.8,
  0.9,
  1.0,
  1.1,
  1.2,
  1.3,
  1.4,
  1.5,
  1.6,
  1.7,
  1.8,
  1.9,
  2.0,
  2.2,
  2.4,
  2.6,
  2.8,
  3.0,
  3.1,
  3.2,
  3.3,
  3.5,
  3.6,
  3.9,
  4.0,
  4.5,
  5.0,
  5.5,
  6.0,
  6.5,
  7.0,
  0.0,
  11.0,
  13.0,
  15.0,
  20.0,
  25.0,
  30.0,
  35.0,
  40.0,
  50.0,
  60.0,
  70.0,
  90.0,
  110.0,
];

export const DefaultFontSizes: DraftStyleMap = {
  ...buildFontSizeDefaults(em_font_sizes),
};

export const StylesDefaults: StylesDefaultsType = {
  blockStyles: defaultBlockStyles,
  defaultColors: DefaultColors,
  defaultFontSizes: DefaultFontSizes,
};
