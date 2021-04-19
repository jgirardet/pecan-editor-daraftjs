import { DraftStyleMap } from "draft-js";
import { BlockStyles, StylesDefaultsType } from "../types";
import { List } from "immutable";

export const defaultFontFamily = "verdana";

export const defaultBlockStyles: BlockStyles = List([
  {
    selector: ".pecan-titre1",
    type: "header-one",
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
    type: "header-two",

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
    type: "header-three",

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
    type: "header-four",

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
    type: "unstyled",

    styles: {
      color: "#444444",
      "font-size": "1.3em",
      "font-weight": "200",
      "font-family": defaultFontFamily,
    },
  },
]);

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
  0.3,
  0.4,
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
  3.3,
  3.9,
  4.2,
  4.6,
  5.0,
  5.5,
  6.6,
  7.2,
  7.9,
  8.6,
  9.4,
  10.0,
  11.0,
  13.0,
  15.0,
  20.0,
  25.0,
  30.0,
  40.0,
  60.0,
  90.0,
];

export const StylesDefaults: StylesDefaultsType = {
  blockStyles: defaultBlockStyles,
  defaultColors: DefaultColors,
  defaultFontSizes: em_font_sizes,
};
