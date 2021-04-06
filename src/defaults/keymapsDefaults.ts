import { LayoutByCommand } from "../types";

const DefaultLayoutCommand: LayoutByCommand = {
  bold: { modifiers: "ctrl", key: "b" },
  italic: { modifiers: "ctrl", key: "i" },
  underline: { modifiers: "ctrl", key: "u" },
  color_1: {
    modifiers: "ctrl",
    key: "j",
  },
  color_2: {
    modifiers: "ctrl",
    key: "k",
  },
  color_3: {
    modifiers: "ctrl",
    key: "l",
  },
  color_4: {
    modifiers: "ctrl",
    key: "m",
  },
  exposant: { modifiers: "ctrl", key: "d" },
  indice: {
    modifiers: "ctrl",
    key: "o",
  },
  "increase-font": { modifiers: "ctrl", key: "+" },
  "decrease-font": { modifiers: "ctrl", key: "-" },
  "select-word": { modifiers: "ctrl", key: "w" },
  undo: { modifiers: "ctrl", key: "z" },
  redo: {
    modifiers: "ctrl+shift",
    key: "z",
  },
  "split-block": { modifiers: "", key: "Enter" },
  "add-line-before": { modifiers: "shift", key: "Enter" },
  "add-line-after": { modifiers: "ctrl", key: "Enter" },
  "loop-header": {
    modifiers: "ctrl",
    key: "y",
  },
  "loop-list-type": {
    modifiers: "ctrl",
    key: "ç",
  },
  "increase-list": {
    modifiers: "ctrl",
    key: "à",
  },
  "decrease-list": {
    modifiers: "ctrl",
    key: ")",
  },
  "popup-menu": { modifiers: "ctrl", key: "Space" },
};

const BepoLayoutCommand: LayoutByCommand = Object.assign(DefaultLayoutCommand, {
  color_1: {
    modifiers: "ctrl",
    key: "t",
  },
  color_2: {
    modifiers: "ctrl",
    key: "s",
  },
  color_3: {
    modifiers: "ctrl",
    key: "r",
  },
  color_4: {
    modifiers: "ctrl",
    key: "n",
  },
  indice: {
    modifiers: "ctrl",
    key: "l",
  },
  "loop-header": {
    modifiers: "ctrl",
    key: "y",
  },
  "loop-list-type": {
    modifiers: "ctrl",
    key: "/",
  },
  "increase-list": {
    modifiers: "ctrl",
    key: "*",
  },
  "decrease-list": {
    modifiers: "ctrl",
    key: "=",
  },
});

export { DefaultLayoutCommand, BepoLayoutCommand };
