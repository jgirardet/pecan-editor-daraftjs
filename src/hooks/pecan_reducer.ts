import { EditorState, RichUtils } from "draft-js";
import { BLOCK_COMMANDS, STYLE_COMMANDS } from "../defaults/commandsDefaults";
import { PecanActionsTypes } from "../types";

export const pecanReduer = (
  state: EditorState,
  action: PecanActionsTypes
): EditorState => {
  switch (action.type) {
    case "UPDATE": {
      return action.payload;
    }
    case "APPLY": {
      return applyFormatting(state, action.payload);
    }
    default:
      throw new Error(`${action} nes pas une action reconnue`);
  }
};

export const applyFormatting = (
  state: EditorState,
  command: string
): EditorState => {
  if (STYLE_COMMANDS.includes(command.toUpperCase())) {
    return RichUtils.toggleInlineStyle(state, command.toUpperCase());
  } else if (BLOCK_COMMANDS.includes(command)) {
    const res = RichUtils.toggleBlockType(state, command);
    return res;
  }
  return state;
};

export const isFormatCommand = (command: string): boolean => {
  return (
    STYLE_COMMANDS.includes(command.toUpperCase()) ||
    BLOCK_COMMANDS.includes(command)
  );
};
