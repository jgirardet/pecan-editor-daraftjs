import {
  ContentBlock,
  DraftHandleValue,
  DraftInlineStyle,
  EditorState,
} from "draft-js";
import { STYLE_COMMANDS } from "../defaults/commandsDefaults";
import { PecanActionsTypes } from "../types";
import { RE_STYLE } from "./format_commands";

export function getBlockStyleFn() {
  return (contentBlock: ContentBlock): string => {
    const type = contentBlock.getType();
    switch (type) {
      case "header-one":
        return "pecan-titre1";
      case "header-two":
        return "pecan-titre2";
      case "header-three":
        return "pecan-titre3";
      case "header-four":
        return "pecan-titre4";
      default:
        return "pecan-unstyled";
    }
  };
}

export function getCustomStyleFn() {
  return (style: DraftInlineStyle, block: ContentBlock) => {
    // if (style.has("COLOR_4")) {
    //   return {
    //     color: "#faad1d",
    //   };
    // }
    return {};
  };
}

export function getHandleKeyCommand(
  dispatch: React.Dispatch<PecanActionsTypes>
) {
  return (command: string): DraftHandleValue => {
    console.log("handleKeyCommand: ", command);
    if (STYLE_COMMANDS.includes(command) || RE_STYLE.test(command)) {
      dispatch({ type: "APPLY", payload: command });
    } else if (command === "loop-header") {
      dispatch({ type: "BLOCK_CHANGE", payload: command });
    } else return "not-handled";
    return "handled";
  };
}

export function getOnChange(dispatch: React.Dispatch<PecanActionsTypes>) {
  return (state: EditorState) => {
    dispatch({ type: "UPDATE", payload: state });
  };
}
