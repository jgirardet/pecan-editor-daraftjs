import {
  EditorState,
  EditorProps,
  DraftStyleMap,
  DraftInlineStyle,
  ContentBlock,
  DraftBlockType,
} from "draft-js";
import {
  ButtonHTMLAttributes,
  ReactNode,
  HTMLAttributes,
  CSSProperties,
} from "react";

export type BlockStyles = Record<DraftBlockType, CSSProperties>;

export interface EditorDefaultsType {
  spellCheckEnabled: boolean;
  keymapLayout: LayoutByCommand;
  toolbarVariant: string;
}

export interface ToolbarDefaultsType {
  buttons: ToolbarButtonInput[];
}

export interface StylesDefaultsType {
  blockStyles: BlockStyles;
  defaultColors: DraftStyleMap;
  defaultFontSizes: number[];
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

export interface CustomStyleFnParams {
  style: DraftInlineStyle;
  block: ContentBlock;
  styles: StylesDefaultsType;
  currentBlockStyle: CSSProperties;
  alreadyBuild: CSSProperties;
}

export type CustomStyleFn = (arg0: CustomStyleFnParams) => CSSProperties;

/* ---------------  generic -------------------------------*/

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export interface DivProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface AProps extends HTMLAttributes<HTMLAnchorElement> {
  children?: ReactNode;
}
/* ---------------  components -------------------------------*/

export interface SharedState {
  inlineStyles: string[];
  blockType: string;
  activeFontSize: number;
  activeColor: string;
}

export interface EditorChildProps extends DivProps {
  config: DefaultsType;
  dispatch: PecanDispatch;
  editorState: EditorState;
  sharedState?: SharedState;
}

export interface EditorAreaProps extends EditorChildProps {
  editorProps?: EditorProps;
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

export interface ToolbarButtonProps extends ButtonProps, ToolbarProps {
  buttonData: ToolbarButtonInput;
}

export interface ToolbarProps {
  dispatch: PecanDispatch;
  config: DefaultsType;
  sharedState: SharedState;
}

export interface DropDownProps extends DivProps {
  hideOnLeave?: Boolean;
  trigger: ButtonProps;
  contentWidth?: string;
  contentHeight?: string;
}

export interface DropDownItemProps extends AProps {
  onSelected: (value: any) => any;
  value: any;
}

/* ---------------  hooks-------------------------------*/

export interface PecanContextProps {
  editorState: EditorState;
  dispatch: PecanDispatch;
  config: DefaultsType;
}

export type PecanActions =
  | "UPDATE"
  | "APPLY"
  | "BLOCK_CHANGE"
  | "FONT_CHANGE"
  | "NEW_EMPTY_BLOCK";

export type PecanDispatch = React.Dispatch<PecanActionsTypes>;

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

export interface PecanActionsNewEmptyBlock extends PecanActionsType {
  type: "NEW_EMPTY_BLOCK";
  payload: string;
}

export type PecanActionsTypes =
  | PecanActionsUpdate
  | PecanActionsApply
  | PecanActionsBlockChange
  | PecanActionsIncreaseFont
  | PecanActionsNewEmptyBlock;
