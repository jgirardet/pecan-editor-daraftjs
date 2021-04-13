import React from "react";

import { KeyBindingUtil } from "draft-js";
import { LayoutByCommand } from "../types";

let { hasCommandModifier } = KeyBindingUtil;

const isCtrl = (e: React.KeyboardEvent<{}>) =>
  hasCommandModifier(e) && !e.shiftKey;
const isCtrlShift = (e: React.KeyboardEvent<{}>) =>
  hasCommandModifier(e) && e.shiftKey;
const isShift = (e: React.KeyboardEvent<{}>) =>
  !hasCommandModifier(e) && e.shiftKey && !e.altKey;
const hasNoModifier = (e: React.KeyboardEvent<{}>) =>
  !hasCommandModifier(e) && !e.shiftKey && !e.altKey;

type KeyCommand = Record<string, string>;
type FormattedLayout = {
  ctrl: KeyCommand;
  ctrlShift: KeyCommand;
  shift: KeyCommand;
  noModifier: KeyCommand;
};

function formatLayout(layout: LayoutByCommand): FormattedLayout {
  let res: FormattedLayout = {
    ctrl: {},
    ctrlShift: {},
    shift: {},
    noModifier: {},
  };
  Object.entries(layout).forEach((entry) => {
    const [com, keys] = entry;
    if (keys.modifiers === "ctrl") res.ctrl[keys.key] = com;
    else if (keys.modifiers === "shift") res.shift[keys.key] = com;
    else if (keys.modifiers === "ctrl+shift") res.ctrlShift[keys.key] = com;
    else if (keys.modifiers === "") res.noModifier[keys.key] = com;
  });
  return res;
}

/* Given a Layout command,  returns   function which handles keybinding */
export function getKeyBindingFactory(layout: LayoutByCommand) {
  const formatted = formatLayout(layout);
  return (e: React.KeyboardEvent<{}>): string | null => {
    const { key } = e;
    if (isCtrl(e)) return formatted.ctrl[key] || null;
    else if (isShift(e)) return formatted.shift[key] || null;
    else if (isCtrlShift(e)) return formatted.ctrlShift[key] || null;
    else if (hasNoModifier(e)) {
      return formatted.noModifier[key] || null;
    } else return null;
  };
}
