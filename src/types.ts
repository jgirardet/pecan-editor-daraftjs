import { EditorState, EditorProps, DraftStyleMap, BlockMap } from "draft-js";
import { ButtonHTMLAttributes, ReactNode, HTMLAttributes, Props } from "react";
import { List } from "immutable";
// defaults

export interface BlockStyle {
  selector: string;
  type: string;
  styles: {
    color?: string;
    "text-decoration-line"?: string;
    "text-decoration-style"?: string;
    "text-decoration-color"?: string;
    "text-transform"?: string;
    "font-size"?: string;
    "font-weight"?: string;
    "font-family"?: string;
  };
}
export type BlockStyles = List<BlockStyle>;

export interface EditorDefaultsType {
  spellCheckEnabled: boolean;
  keymapLayout: LayoutByCommand;
}

export interface ToolbarDefaultsType {
  buttons: ToolbarButtonInput[];
}

export interface StylesDefaultsType {
  blockStyles: BlockStyles;
  defaultColors: DraftStyleMap;
  defaultFontSizes: DraftStyleMap;
}
export interface DefaultsType {
  toolbar: ToolbarDefaultsType;
  commands: { styleCommands: string[]; blockCommands: string[] };
  styles: StylesDefaultsType;
  editor: EditorDefaultsType;
}

// ---------------------  api --------------------------------

export type ModifiersKey = "ctrl" | "shift" | "ctrl+shift" | "";

export type KeyLayoutEntry = { modifiers: ModifiersKey; key: string };

export type LayoutByCommand = Record<string, KeyLayoutEntry>;

// ---------------------  components --------------------------------

// generic
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export interface DivProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

// editor

export interface SomeEditorState {
  inlineStyles: string[];
  blockType: string;
  activeFontSize: number;
}

export interface EditorAreaProps {
  config: DefaultsType;
  dispatch: React.Dispatch<PecanActionsTypes>;
  editorState: EditorState;
  className?: string;
  props?: EditorProps;
  // onChange?: Function;
}

export interface PecanEditorProps {
  initialState?: EditorState;
}

export interface ToolbarButtonInput {
  tooltip?: string;
  icon?: string;
  action: string;
  type: "inline" | "block";
  otherProps?: object;
}

export interface ToolbarButtonProps extends ButtonProps {
  handler: ({ type, payload }: PecanActionsTypes) => void;
  buttonData: ToolbarButtonInput;
  someEditorState: SomeEditorState;
}
export interface ToolbarProps {
  dispatch: React.Dispatch<PecanActionsTypes>;
  config: DefaultsType;
  someEditorState: SomeEditorState;
}

export interface FontSizeSelectProps extends DivProps {
  dispatch: React.Dispatch<PecanActionsTypes>;
  someEditorState: SomeEditorState;
  selectData: number[];
}

// hooks
export interface PecanContextProps {
  editorState: EditorState;
  dispatch: React.Dispatch<PecanActionsTypes>;
  config: DefaultsType;
}

export type PecanActions = "UPDATE" | "APPLY" | "BLOCK_CHANGE" | "FONT_CHANGE";

export interface PecanActionsType {
  type: PecanActions;
  payload: EditorState | string | { command: string; config: DefaultsType };
}

export interface PecanActionsUpdate extends PecanActionsType {
  type: "UPDATE";
  payload: EditorState;
}

export interface PecanActionsApply extends PecanActionsType {
  type: "APPLY";
  payload: string;
}

export interface PecanActionsBlockChange extends PecanActionsType {
  type: "BLOCK_CHANGE";
  payload: string;
}

export interface PecanActionsIncreaseFont extends PecanActionsType {
  type: "FONT_CHANGE";
  payload: { command: string; config: DefaultsType };
}

export type PecanActionsTypes =
  | PecanActionsUpdate
  | PecanActionsApply
  | PecanActionsBlockChange
  | PecanActionsIncreaseFont;
