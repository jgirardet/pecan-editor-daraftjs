import { EditorState } from "draft-js";
import {
  applyFormatting,
  blockChange,
  moveFontSize,
} from "../api/format_commands";
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
    case "BLOCK_CHANGE": {
      return blockChange(state, action.payload);
    }
    case "FONT_CHANGE": {
      return moveFontSize(state, action.payload.command, action.payload.config);
    }
    default:
      throw new Error(`${action} n'est pas une action reconnue`);
  }
};
