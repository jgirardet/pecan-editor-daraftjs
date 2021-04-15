import { DraftInlineStyle } from "draft-js";
import { ContentState } from "draft-js";
import { EditorState, RichUtils } from "draft-js";
import { STYLE_COMMANDS, BLOCK_COMMANDS } from "../defaults/commandsDefaults";

import { CharacterMetadata } from "draft-js";
import { mapSelectedCharacters } from "./draftutils";

export const RE_STYLE = RegExp("^[A-Z]+__[.#A-Z0-9]+$"); // match custom styles

const LOOP_HEADER = [
  "header-one",
  "header-two",
  "header-three",
  "header-four",
  "unstyled",
];

/*
Apply inline style
*/
export function applyFormatting(
  state: EditorState,
  command: string
): EditorState {
  if (STYLE_COMMANDS.includes(command))
    return RichUtils.toggleInlineStyle(state, command);
  else if (RE_STYLE.test(command)) return switchStyle(state, command);

  return state;
}

/*
Change Block style.
command: loop-header : select the next in LOOP-HEADER
command: any of LOOP_HEADER : go with it
*/
export function blockChange(state: EditorState, command: string): EditorState {
  const header = RichUtils.getCurrentBlockType(state);
  if (LOOP_HEADER.includes(header)) {
    const idx = (LOOP_HEADER.indexOf(header) + 1) % LOOP_HEADER.length;
    return RichUtils.toggleBlockType(state, LOOP_HEADER[idx]);
  } else if (BLOCK_COMMANDS.includes(command))
    return RichUtils.toggleBlockType(state, command);
  return state;
}

/* Switch Style of the current selection
Each style has the following format : PREFIX__VALUE
PREFIX: the collection
VALUE: the style
example: COLOR__1, FONTSIZE__12
*/
export function switchStyle(state: EditorState, newStyle: string): EditorState {
  const selection = state.getSelection();

  if (selection.isCollapsed()) {
    const prefix = newStyle.split("__")[0];
    const clearedStyles = state
      .getCurrentInlineStyle()
      .filterNot((v, k) => k!.startsWith(prefix)) as DraftInlineStyle;

    const clearedState = EditorState.setInlineStyleOverride(
      state,
      clearedStyles
    );
    return RichUtils.toggleInlineStyle(clearedState, newStyle);
  } else {
    const newContent = mapSelectedCharacters(
      (char) => switchCharacterStyle(char, newStyle),
      state
    );

    return EditorState.push(
      state,
      newContent as ContentState,
      "change-inline-style"
    );
  }
}

/*
  Replace every styles starting with `prefix` by newStyle stating with the same prefix.
  Prefix and style value shoudl be separated by 2 underscores : `__`
 */
export function switchCharacterStyle(
  char: CharacterMetadata,
  newStyle: string
): CharacterMetadata {
  const prefix = newStyle.split("__")[0];
  const cleared = char
    .getStyle()
    .toArray()
    .reduce((acc: any, val: string) => {
      if (val.startsWith(prefix))
        return CharacterMetadata.removeStyle(acc, val);
      else return acc;
    }, char);
  return CharacterMetadata.applyStyle(cleared, newStyle);
}

export const isFormatCommand = (command: string): boolean => {
  return (
    STYLE_COMMANDS.includes(command.toUpperCase()) ||
    BLOCK_COMMANDS.includes(command)
  );
};
