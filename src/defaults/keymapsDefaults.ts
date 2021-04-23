import { LayoutByCommand } from "../types";

const DefaultLayoutCommand: LayoutByCommand = {
  BOLD: { modifiers: "ctrl", key: "b" },
  ITALIC: { modifiers: "ctrl", key: "i" },
  UNDERLINE: { modifiers: "ctrl", key: "u" },
  STRIKETHROUGH: { modifiers: "ctrl", key: "é" },
  CODE: { modifiers: "ctrl", key: "e" },
  color__1: {
    modifiers: "ctrl",
    key: "j",
  },
  color__2: {
    modifiers: "ctrl",
    key: "k",
  },
  color__3: {
    modifiers: "ctrl",
    key: "l",
  },
  color__4: {
    modifiers: "ctrl",
    key: "m",
  },
  CLEAR_FORMAT: { modifiers: "ctrl", key: "," },
  verticalAlign__super: { modifiers: "ctrl", key: "d" },
  verticalAlign__sub: {
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
    color__1: {
      modifiers: "ctrl",
      key: "t",
    },
    color__2: {
      modifiers: "ctrl",
      key: "s",
    },
    color__3: {
      modifiers: "ctrl",
      key: "r",
    },
    color__4: {
      modifiers: "ctrl",
      key: "n",
    },
    verticalAlign__sub: {
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
