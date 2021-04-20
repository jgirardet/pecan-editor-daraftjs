/* 
specific draftjs api utilities 
*/

import { ContentState, DraftInlineStyle } from "draft-js";
import { CharacterMetadata, EditorState, ContentBlock } from "draft-js";
import { BlockStyles } from "../types";
import { Color } from "./color";
import { FontSize } from "./fontsize";

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
FindInlineStyle
Return Inlinestyle if callback is true
ex : findInlineStyle(state, (val)=>val.startWith("MyStyle"))
*/
export function findInlineStyle(
  state: EditorState,
  callback: (value?: string) => boolean
): string {
  const sel = state.getSelection();
  let curStyles: DraftInlineStyle;
  if (sel.isCollapsed()) {
    curStyles = state.getCurrentInlineStyle();
  } else {
    curStyles = state
      .getCurrentContent()
      .getBlockMap()
      .get(sel.getAnchorKey())
      .getInlineStyleAt(sel.getAnchorOffset());
  }
  return curStyles.find(callback);
}

/*
findInlineBlockStyle
if style not inline, try to find it in block
*/
export function findInlineBlockSyle(
  state: EditorState,
  inlinePredicate: (val?: string) => boolean,
  blockStyles: BlockStyles,
  blockPredicate: (
    state: EditorState,
    blockstyles: BlockStyles,
    key: string
  ) => string
) {
  let style: string = findInlineStyle(state, inlinePredicate);
  if (!style) {
    const sel = state.getSelection();
    const key = sel.getAnchorKey();
    style = blockPredicate(state, blockStyles, key);
  }
  return style;
}

/*
finds fontSize in inline styles then in block
*/
export function findInlineBlockFontSize(
  state: EditorState,
  blockStyles: BlockStyles
) {
  return findInlineBlockSyle(
    state,
    (val) => val!.startsWith("FONTSIZE"),
    blockStyles,
    (state, blockStyles, key) => {
      const fontsize = FontSize.fromBlock(state, blockStyles, key);
      return fontsize ? fontsize.toStyle() : "";
    }
  );
}

/*
finds color in inline styles then in block
*/
export function findInlineBlockColor(
  state: EditorState,
  blockStyles: BlockStyles
) {
  return findInlineBlockSyle(
    state,
    (val) => val!.startsWith("COLOR"),
    blockStyles,
    (state, blockStyles, key) => {
      const colored = Color.fromBlock(state, blockStyles, key);
      return colored ? colored.toStyle() : "";
    }
  );
}
