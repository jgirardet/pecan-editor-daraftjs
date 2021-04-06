import { EditorState, EditorProps } from "draft-js";
import { ButtonHTMLAttributes, ReactNode, HTMLAttributes } from "react";

// defaults

export interface EditorDefaultsType {
  spellCheckEnabled: boolean;
  keymapLayout: LayoutByCommand;
}

export interface ToolbarDefaultsType {
  buttons: ToolbarButtonInput[];
}
export interface DefaultsType {
  toolbar: ToolbarDefaultsType;
  commands: { styleCommands: string[]; blockCommands: string[] };
  styles: Record<string, StylesGroup>;
  editor: EditorDefaultsType;
}

// ---------------------  api --------------------------------

export type ModifiersKey = "ctrl" | "shift" | "ctrl+shift" | "";
export type KeyLayoutEntry = { modifiers: ModifiersKey; key: string };
export type LayoutByCommand = Record<string, KeyLayoutEntry>;
export type CSSStyle = Partial<CSSStyleDeclaration>;
export type StylesGroup = Record<string, CSSStyle>;
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
}

export interface EditorAreaProps extends EditorProps {
  config: DefaultsType;
  className?: string;
  dispatch: React.Dispatch<PecanActionsTypes>;
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

// hooks
export interface PecanContextProps {
  editorState: EditorState;
  dispatch: React.Dispatch<PecanActionsTypes>;
  config: DefaultsType;
}

export type PecanActions = "UPDATE" | "APPLY";

export interface PecanActionsType {
  type: PecanActions;
  payload: EditorState | string;
}

export interface PecanActionsUpdate extends PecanActionsType {
  type: "UPDATE";
  payload: EditorState;
}

export interface PecanActionsApply extends PecanActionsType {
  type: "APPLY";
  payload: string;
}

export type PecanActionsTypes = PecanActionsUpdate | PecanActionsApply;
