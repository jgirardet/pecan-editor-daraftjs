import classnames from "classnames";
import { Editor } from "draft-js";
import { useCallback, useEffect, useMemo } from "react";
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
  dispatch,
  editorState,
  className,
  editorProps,
  ...props
}: EditorAreaProps): JSX.Element => {
  const editorConfig = config.editor;
  const blockStyles = config.styles.blockStyles;

  useEffect(() => {
    ApplyBlockStyles(blockStyles);
  }, [blockStyles]);

  const onChange = useCallback(() => getOnChange(dispatch), [dispatch]);
  const blockStyleFn = useMemo(() => getBlockStyleFn(), []);
  const keyBindingFn = useMemo(
    () => getKeyBindingFactory(config.editor.keymapLayout),
    [config.editor.keymapLayout]
  );
  const customStyleMap = useMemo(() => buildCustomStyleMap(config.styles), [
    config.styles,
  ]);
  const handleKeyCommand = useMemo(
    () => getHandleKeyCommand(dispatch, config),
    [dispatch, config]
  );
  const customStyleFn = useMemo(() => getCustomStyleFn(), []);
  return (
    <div className={classnames(className)} {...props}>
      <Editor
        editorState={editorState}
        onChange={onChange()}
        blockStyleFn={blockStyleFn}
        keyBindingFn={keyBindingFn}
        handleKeyCommand={handleKeyCommand}
        customStyleFn={customStyleFn}
        customStyleMap={customStyleMap}
        spellCheck={editorConfig.spellCheckEnabled}
        {...editorProps}
      />
    </div>
  );
};
