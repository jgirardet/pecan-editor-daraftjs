import createEditorStateWithText from "@draft-js-plugins/editor/lib/utils/createEditorStateWithText";
import {
  CharacterMetadata,
  ContentState,
  convertFromHTML,
  DraftInlineStyle,
  EditorState,
  Modifier,
  SelectionState,
} from "draft-js";
import { SomeEditorState } from "../types";
import { List } from "immutable";
export function createStateFromMarkup(html: string): EditorState {
  const blocksFromHTML = convertFromHTML(html);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  return EditorState.createWithContent(state);
}

// export function createStateWithText(
//   text: string,
//   style?: DraftInlineStyle
// ): EditorState {
//   const state = EditorState.createEmpty();
//   const content = ContentState.createFromText(text);
//   // const state = createEditorStateWithText().createFromBlockArray(content.getBlocksAsArray());
//   return state;
//   // const key = content.getFirstBlock().getKey();
//   // const contentText = text.split("\n");

//   // const contentWithText = contentText.reduce((acc, val) => {
//   //   const temp =  Modifier.insertText(
//   //     acc,
//   //     SelectionState.createEmpty(key),
//   //     val,
//   //     style
//   //   );
//   //   return Modifier.splitBlock(temp,SelectionState.createEmpty() )
//   // }, content);
//   // return EditorState.push(state, contentWithText, "insert-characters");
// }

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

// export const newSelectionAt(start, end, blockS, blockE) {
//   var selectionState = SelectionState.createEmpty(blockS);
//   const updatedSelectionState = selectionState.merge({
//     anchorKey: blockStart,
//     anchorOffset: start,
//     focusKey: blockEnd,
//     focusOffset: end,
//   });
// }

export const emptySomeEditorState: SomeEditorState = {
  inlineStyles: [],
  blockType: "",
};
