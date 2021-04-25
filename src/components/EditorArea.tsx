import classnames from "classnames";
import { Editor } from "draft-js";
import { useCallback, useMemo } from "react";
import {
  getHandleReturn,
  getKeyBindingFactory,
} from "../api/default_keybindings";
import {
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

  const onChange = useCallback(() => getOnChange(dispatch), [dispatch]);
  const keyBindingFn = useMemo(
    () => getKeyBindingFactory(config.editor.keymapLayout),
    [config.editor.keymapLayout]
  );
  const handleKeyCommand = useMemo(
    () => getHandleKeyCommand(dispatch, config),
    [dispatch, config]
  );
  const customStyleFn = useMemo(() => getCustomStyleFn(config.styles), [
    config.styles,
  ]);
  const handleReturn = getHandleReturn(dispatch);
  return (
    <div className={classnames(className)} {...props}>
      <Editor
        editorState={editorState}
        onChange={onChange()}
        keyBindingFn={keyBindingFn}
        // handleReturn={handleReturn}
        handleKeyCommand={handleKeyCommand}
        customStyleFn={customStyleFn}
        spellCheck={editorConfig.spellCheckEnabled}
        {...editorProps}
      />
    </div>
  );
};
