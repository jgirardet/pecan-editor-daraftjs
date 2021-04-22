import {
  ContentBlock,
  DraftHandleValue,
  DraftInlineStyle,
  EditorState,
} from "draft-js";
import { STYLE_COMMANDS } from "../defaults/commandsDefaults";
import { DefaultsType, PecanActionsTypes } from "../types";
import { RE_STYLE } from "./format_commands";

import { Map } from "immutable";
import { FontSize, fontsize } from "./fontsize";
import { defaultBlockStyles } from "../defaults/stylesDefaults";

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
    let res = Map<string, string>();
    const blockType = block.getType();
    const blockDefault = defaultBlockStyles
      .filter((x) => x?.type === blockType)
      .first().styles;

    /* size*/
    const size = style.find((v) => {
      if (v?.startsWith("FONTSIZE__")) {
        return true;
      } else return false;
    });
    if (size) {
      res = res.set("fontSize", size.split("__")[1] + "em");
    }

    /*color*/
    const ccolor = style.find((v) => {
      if (v?.startsWith("COLOR__#")) {
        return true;
      } else return false;
    });
    if (ccolor) {
      res = res.set("color", ccolor.split("__")[1]);
    }

    /* subscript superscript*/
    const verticalAlign = style.find((v) => {
      if (v?.startsWith("VERTICAL_ALIGN__")) {
        return true;
      } else return false;
    });
    if (verticalAlign) {
      console.log(style.toArray());
      const currentSize = size
        ? fontsize(size)
        : FontSize.fromEm(blockDefault["font-size"]!);
      const verticalFontSize: string = (currentSize.float / 2).toFixed(1);
      res = res.merge({
        verticalAlign: verticalAlign.split("__")[1].toLowerCase(),
        fontSize: verticalFontSize + "em",
      });
    }
    return res.toJS();
  };
}

export function getHandleKeyCommand(
  dispatch: React.Dispatch<PecanActionsTypes>,
  config: DefaultsType
) {
  return (command: string): DraftHandleValue => {
    console.log("handleKeyCommand :", command);
    if (
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
