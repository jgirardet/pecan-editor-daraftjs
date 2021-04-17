import { LayoutByCommand } from "../types";

const DefaultLayoutCommand: LayoutByCommand = {
  BOLD: { modifiers: "ctrl", key: "b" },
  ITALIC: { modifiers: "ctrl", key: "i" },
  UNDERLINE: { modifiers: "ctrl", key: "u" },
  STRIKETHROUGH: { modifiers: "ctrl", key: "é" },
  CODE: { modifiers: "ctrl", key: "e" },
  COLOR__1: {
    modifiers: "ctrl",
    key: "j",
  },
  COLOR__2: {
    modifiers: "ctrl",
    key: "k",
  },
  COLOR__3: {
    modifiers: "ctrl",
    key: "l",
  },
  COLOR__4: {
    modifiers: "ctrl",
    key: "m",
  },
  EXPOSANT: { modifiers: "ctrl", key: "d" },
  INDICE: {
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

const BepoLayoutCommand: LayoutByCommand = {
  ...DefaultLayoutCommand,
  ...{
    COLOR__1: {
      modifiers: "ctrl",
      key: "t",
    },
    COLOR__2: {
      modifiers: "ctrl",
      key: "s",
    },
    COLOR__3: {
      modifiers: "ctrl",
      key: "r",
    },
    COLOR__4: {
      modifiers: "ctrl",
      key: "n",
    },
    INDICE: {
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
  },
};
export { DefaultLayoutCommand, BepoLayoutCommand };
