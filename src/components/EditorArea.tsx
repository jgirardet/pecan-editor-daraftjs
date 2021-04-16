import classNames from "classnames";
import { Editor } from "draft-js";
import { useEffect } from "react";
import { buildCustomStyleMap } from "../api/custom_stylemap";
import { getKeyBindingFactory } from "../api/default_keybindings";
import { ApplyBlockStyles } from "../api/dom_manipulation";
import {
  getBlockStyleFn,
  getCustomStyleFn,
  getHandleKeyCommand,
  getOnChange,
} from "../api/editor_api";
import { EditorAreaProps } from "../types";

export const EditorArea = ({
  config,
  className = "",
  dispatch,
  editorState,
  ...props
}: EditorAreaProps) => {
  const editorConfig = config.editor;
  const blockStyles = config.styles.blockStyles;

  useEffect(() => {
    ApplyBlockStyles(blockStyles);
    console.log("pim");
  }, [blockStyles]);

  const onChange = getOnChange(dispatch);
  const blockStyleFn = getBlockStyleFn();
  const keyBindingFn = getKeyBindingFactory(config.editor.keymapLayout);
  const customStyleMap = buildCustomStyleMap(config.styles);
  const handleKeyCommand = getHandleKeyCommand(dispatch, config);
  const customStyleFn = getCustomStyleFn();
  return (
    <div className={classNames(className)}>
      <Editor
        editorState={editorState}
        onChange={onChange}
        blockStyleFn={blockStyleFn}
        keyBindingFn={keyBindingFn}
        handleKeyCommand={handleKeyCommand}
        customStyleFn={customStyleFn}
        customStyleMap={customStyleMap}
        spellCheck={editorConfig.spellCheckEnabled}
        {...props}
      />
    </div>
  );
};
