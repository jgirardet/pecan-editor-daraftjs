import {
  ContentBlock,
  DraftHandleValue,
  DraftInlineStyle,
  EditorState,
} from "draft-js";
import { STYLE_COMMANDS } from "../defaults/commandsDefaults";
import { DefaultsType, PecanActionsTypes, StylesDefaultsType } from "../types";
import { RE_STYLE } from "./format_commands";

import { customStyleFnWorkers } from "./customstylefn";
import { CSSProperties } from "react";

export function getCustomStyleFn(styles: StylesDefaultsType) {
  return (style: DraftInlineStyle, block: ContentBlock): CSSProperties => {
    const currentBlockStyle = styles.blockStyles[block.getType()];

    const res = customStyleFnWorkers.reduce((prev, fn) => {
      return Object.assign(
        prev,
        fn({ style, block, styles, currentBlockStyle, alreadyBuild: prev })
      );
    }, {});
    return res;
  };
}

export function getHandleKeyCommand(
  dispatch: React.Dispatch<PecanActionsTypes>,
  config: DefaultsType
) {
  return (command: string): DraftHandleValue => {
    console.log("handleKeyCommand :", command);
    if (command === "split-block-unstyled")
      dispatch({ type: "NEW_EMPTY_BLOCK", payload: "" });
    else if (command === "add-line-before")
      dispatch({ type: "NEW_EMPTY_BLOCK", payload: "before" });
    else if (command === "add-line-after")
      dispatch({ type: "NEW_EMPTY_BLOCK", payload: "after" });
    else if (
      STYLE_COMMANDS.includes(command) ||
      RE_STYLE.test(command) ||
      command === "CLEAR_FORMAT"
    ) {
      dispatch({ type: "APPLY", payload: command });
    } else if (command === "loop-header") {
      dispatch({ type: "BLOCK_CHANGE", payload: command });
    } else if (["increase-font", "decrease-font"].includes(command)) {
      dispatch({
        type: "FONT_CHANGE",
        payload: { command: command, config: config },
      });
    } else return "not-handled";
    return "handled";
  };
}

export function getOnChange(dispatch: React.Dispatch<PecanActionsTypes>) {
  return (state: EditorState) => {
    dispatch({ type: "UPDATE", payload: state });
  };
}
