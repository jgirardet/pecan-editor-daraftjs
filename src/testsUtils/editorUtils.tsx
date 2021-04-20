import { List } from "immutable";
import {
  EditorState,
  SelectionState,
  ContentState,
  CharacterMetadata,
} from "draft-js";
import { SomeEditorState } from "../types";

export function setEditorSelection(
  state: EditorState,
  start: number,
  end: number,
  bStart: number = 0,
  bEnd: number = 0
): EditorState {
  const blockmap = state.getCurrentContent().getBlockMap();
  const blocks = blockmap.slice(bStart, bEnd + 1);
  const blockStart = blocks.first().getKey();
  const blockEnd = blocks.last().getKey();
  var selectionState = SelectionState.createEmpty(blockStart);
  const updatedSelectionState = selectionState.merge({
    anchorKey: blockStart,
    anchorOffset: start,
    focusKey: blockEnd,
    focusOffset: end,
  });
  return EditorState.acceptSelection(state, updatedSelectionState);
}

export function getAllChars(content: ContentState): List<CharacterMetadata> {
  return content
    .getBlockMap()
    .map((b) => b!.getCharacterList())
    .reduce((acc, val) => acc!.push(...val!.toArray()), List());
}

export const emptySomeEditorState: SomeEditorState = {
  inlineStyles: [],
  blockType: "",
  activeFontSize: 1.3,
  activeColor: "COLOR__#444444",
};

export function emToPx(em: string) {
  return (parseFloat(em.trim().replace("em", "")) * 16).toString() + "px";
}
