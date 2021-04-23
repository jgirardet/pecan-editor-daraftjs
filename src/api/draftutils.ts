/* 
specific draftjs api utilities 
*/

import { ContentState,  RichUtils } from "draft-js";
import { CharacterMetadata, EditorState, ContentBlock } from "draft-js";
import { BlockStyles, DefaultsType, SharedState } from "../types";
import { fontsize } from "./fontsize";
import CSS from "csstype";
/*
Iterate over each choracted and apply cllback to each
from https://github.com/webdeveloperpr/draft-js-custom-styles/blob/master/src/index.js
*/
export const mapSelectedCharacters = (
  callback: (char: CharacterMetadata) => CharacterMetadata,
  editorState: EditorState
): ContentState => {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const blockMap = contentState.getBlockMap();
  const startKey = selectionState.getStartKey();
  const startOffset = selectionState.getStartOffset();
  const endKey = selectionState.getEndKey();
  const endOffset = selectionState.getEndOffset();

  const newBlocks = blockMap
    .skipUntil((_, k) => {
      return k === startKey;
    })
    .takeUntil((_, k) => {
      return k === endKey;
    })
    .concat(new Map([[endKey, blockMap.get(endKey)]]))
    .map((block, blockKey) => {
      if (block === undefined) throw new Error("key without block"); //can't be undefined, fix ts check
      let sliceStart;
      let sliceEnd;

      // sliceStart -> where the selection starts
      // endSlice -> Where the selection ends

      // Only 1 block selected
      if (startKey === endKey) {
        sliceStart = startOffset;
        sliceEnd = endOffset;
        // Gets the selected characters of the block when multiple blocks are selected.
      } else {
        sliceStart = blockKey === startKey ? startOffset : 0;
        sliceEnd = blockKey === endKey ? endOffset : block.getLength();
      }

      // Get the characters of the current block
      let chars = block.getCharacterList();
      let current;
      while (sliceStart < sliceEnd) {
        current = chars.get(sliceStart);
        const newChar = callback(current);
        chars = chars.set(sliceStart, newChar);
        sliceStart++;
      }

      return block.set("characterList", chars);
    });

  return contentState.merge({
    blockMap: blockMap.merge(newBlocks as ContentBlock),
    selectionBefore: selectionState,
    selectionAfter: selectionState,
  }) as ContentState;
};

/*
findInlineBlockStyle
Given name (string==csskey) return the correspondinf style inline if exists
and fallback to block
*/
export function findInlineBlockStyle(
  name: string,
  state: EditorState,
  blockStyles: BlockStyles
): string {
  const styles = state.getCurrentInlineStyle();
  const inline = styles.find((v) => v!.startsWith(name + "__"));
  if (inline) return inline;
  const blockType = RichUtils.getCurrentBlockType(state);
  if (blockType)
    return (
      name +
      "__" +
      (blockStyles[blockType][name as keyof CSS.Properties] as string)
    );
  else return "";
}

/*
getSharedState
*/
export function getSharedState(
  state: EditorState,
  config: DefaultsType
): SharedState {
  return {
    inlineStyles: state.getCurrentInlineStyle().toArray(),
    blockType: RichUtils.getCurrentBlockType(state),
    activeFontSize: fontsize(
      findInlineBlockStyle("fontSize", state, config.styles.blockStyles)
    ).float,
    activeColor: findInlineBlockStyle(
      "color",
      state,
      config.styles.blockStyles
    ),
  };
}
