import { ContentState, convertFromHTML, EditorState } from "draft-js";
import { SomeEditorState } from "../types";

export function createStateFromMarkup(html: string): EditorState {
  const blocksFromHTML = convertFromHTML(html);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  return EditorState.createWithContent(state);
}

export const emptySomeEditorState: SomeEditorState = {
  inlineStyles: [],
  blockType: "",
};
