// import {
//   ContentBlock,
//   DraftHandleValue,
//   EditorState,
//   KeyBindingUtil,
//   RichUtils,
// } from 'draft-js';
// import { Dispatch, useReducer } from 'react';
// import { STYLE_COMMANDS, BLOCK_COMMANDS } from 'src/defaults/commandsDefaults';
// import { applyFormatting, PecanActionsTypes, pecanReduer } from 'src/hooks/pecan_reducer';

// export
// }

// export function handleKeyCommand(
//   command: string,
//   editorState: EditorState,
//   dispatch: Dispatch<PecanActionsTypes>
// ): DraftHandleValue {
//   console.log(command);
//   const newState
// if (STYLE_COMMANDS.includes(command.toUpperCase())) {
//   const newState = RichUtils.toggleInlineStyle(
//     editorState,
//     command.toUpperCase(),
//   );
//   EditorState.push(
//     editorState,
//     newState.getCurrentContent(),
//     'change-inline-style',
//   );
//   return 'handled';
// } else if (BLOCK_COMMANDS.includes(command)) {
//   const res = RichUtils.toggleBlockType(editorState, command);
//   return 'handled';
// }
// const newState = applyFormatting(editorState, command);
// console.log(editorState, newState, editorState !== newState);
// if (editorState !== newState) return 'handled';

// return 'handled';
// }

//  const keyBindingFunction = (event: KeyboardEvent) => {
//    let res: string | null = null;

//    if (KeyBindingUtil.hasCommandModifier(event)) {
//      if (event.shiftKey && event.key === 'X') res = 'STRIKETHROUGH';
//      if (event.shiftKey && event.key === 'A') res = 'header-one';
//      if (event.shiftKey && event.key === 'Z') res = 'header-two';
//      if (event.shiftKey && event.key === 'R') res = 'header-three';
//      if (event.shiftKey && event.key === 'H') res = 'HIGHLIGHT';
//    }
//    if (res) {
//      event.preventDefault();
//      return res;
//    }
//    return getDefaultKeyBinding(event);
//  };
// interface BlockStyleContent {
//   size: string;
//   color: string;
//   other: string;
// }
// type BlockStyleName =
//   | 'unstyled'
//   | 'paragraph'
//   | 'header-one'
//   | 'header-two'
//   | 'header-three'
//   | 'header-four'
//   | 'header-five'
//   | 'header-six'
//   | 'unordered-list-item'
//   | 'ordered-list-item'
//   | 'blockquote'
//   | 'code-block'
//   | 'atomic';

// const DefaultBlockStyles: Record<BlockStyleName, BlockStyleContent> = {
//   unstyled: {
//     size: 'is-size-4',
//     color: 'has-text-',
//     other: '',
//   },
// };
export {};
