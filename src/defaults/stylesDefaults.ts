import { DraftStyleMap } from "draft-js";
import { buildFontSizeDefaults } from "../api/custom_stylemap";
import { StylesDefaultsType } from "../types";

export const defaultFontFamily = "verdana";

export const defaulBlockStyles: DraftStyleMap = {
  "pecan-titre1": {
    color: "#FF3860",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#FF3860",
    textTransform: "uppercase",
    fontSize: "2.5em",
    fontWeight: 500,
    fontFamily: defaultFontFamily,
  },
  "pecan-titre2": {
    color: "#15b168",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#15b168",
    textTransform: "capitalize",
    fontSize: "2.3em",
    fontWeight: 500,
    fontFamily: defaultFontFamily,
  },
  "pecan-titre3": {
    color: "#044cd3",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#044cd3",
    textTransform: undefined,
    fontSize: "2.1em",
    fontWeight: 500,
    fontFamily: defaultFontFamily,
  },
  "pecan-titre4": {
    color: "#faad1d",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#faad1d",
    textTransform: undefined,
    fontSize: "1.9em",
    fontWeight: 500,
    fontFamily: defaultFontFamily,
  },
  "pecan-unstyled": {
    color: "#444444",
    fontSize: "1.3em",
    fontWeight: 200,
    fontFamily: defaultFontFamily,
  },
};

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
  blockStyles: defaulBlockStyles,
  defaultColors: DefaultColors,
  defaultFontSizes: DefaultFontSizes,
};
