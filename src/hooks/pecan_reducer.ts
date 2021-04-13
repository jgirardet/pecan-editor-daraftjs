import { EditorState } from "draft-js";
import { applyFormatting } from "../api/format_commands";
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
      throw new Error(`${action} n'est pas une action reconnue`);
  }
};
