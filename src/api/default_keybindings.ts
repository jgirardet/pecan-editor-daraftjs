import React from "react";

import { DraftHandleValue, EditorState, KeyBindingUtil } from "draft-js";
import { LayoutByCommand, PecanActionsTypes } from "../types";

let { hasCommandModifier } = KeyBindingUtil;

const isCtrl = (e: React.KeyboardEvent<{}>) => hasCommandModifier(e); // && !e.shiftKey;
const isCtrlShift = (e: React.KeyboardEvent<{}>) =>
  hasCommandModifier(e) && e.shiftKey;
const isShift = (e: React.KeyboardEvent<{}>) =>
  !hasCommandModifier(e) && e.shiftKey && !e.altKey;

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
    let res: string | null = null;
    if (isCtrlShift(e)) res = formatted.ctrlShift[key];
    if (!res) {
      if (isCtrl(e)) res = formatted.ctrl[key];
      else if (isShift(e)) res = formatted.shift[key];
      else res = formatted.noModifier[key];
    }
    console.log(res);
    if (res) {
      e.preventDefault();
      return res;
    } else return null; //getDefaultKeyBinding(e);
  };
}

// null;
export function getHandleReturn(dispatch: React.Dispatch<PecanActionsTypes>) {
  return (
    event: React.KeyboardEvent<{}>,
    editorState: EditorState
  ): DraftHandleValue => {
    let payload = "";
    dispatch({ type: "NEW_EMPTY_BLOCK", payload: "" });
    return "handled";
  };
}
