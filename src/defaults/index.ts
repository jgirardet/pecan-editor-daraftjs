import { DefaultsType } from "../types";
import { CommandsDefaults } from "./commandsDefaults";
import { EditorDefaults } from "./editorDefaults";
import { StylesDefaults } from "./stylesDefaults";
import { ToolbarDefaults } from "./toolbarDefaults";
export const Defaults: DefaultsType = {
  toolbar: ToolbarDefaults,
  commands: CommandsDefaults,
  styles: StylesDefaults,
  editor: EditorDefaults,
};
