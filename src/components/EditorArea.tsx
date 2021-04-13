import classNames from "classnames";
import { ContentBlock, DraftInlineStyle, Editor, EditorState } from "draft-js";
import { useEffect } from "react";
import { buildCustomStyleMap } from "../api/custom_stylemap";
import { getKeyBindingFactory } from "../api/default_keybindings";
import { applyStyles } from "../api/dom_manipulation";
import { RE_STYLE } from "../api/format_commands";
import { STYLE_COMMANDS } from "../defaults/commandsDefaults";
import { EditorAreaProps } from "../types";

/* Components */

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
    applyStyles(blockStyles);
  }, [editorState, blockStyles]);

  const onChange = (state: EditorState) => {
    dispatch({ type: "UPDATE", payload: state });
  };

  function BlockStyleFn(contentBlock: ContentBlock): any {
    const type = contentBlock.getType();
    switch (type) {
      case "header-one":
        return "pecan-titre1";
      case "header-two":
        return "pecan-titre2";
      case "header-three":
        return "pecan-titre3";
      case "header-four":
        return "pecan-titre4";
      default:
        return "pecan-unstyled";
    }
  }

  const handleKeyCommand = (command: string) => {
    if (STYLE_COMMANDS.includes(command) || RE_STYLE.test(command)) {
      dispatch({ type: "APPLY", payload: command });
      return "handled";
    }
    return "not-handled";
  };

  function customStyleFn(style: DraftInlineStyle, block: ContentBlock) {
    // if (style.has("COLOR_4")) {
    //   return {
    //     color: "#faad1d",
    //   };
    // }
    return {};
  }
  const keyBindingFn = getKeyBindingFactory(config.editor.keymapLayout);
  const customStyleMap = buildCustomStyleMap(config.styles);
  return (
    <div className={classNames(className)}>
      <Editor
        blockStyleFn={BlockStyleFn}
        spellCheck={editorConfig.spellCheckEnabled}
        keyBindingFn={keyBindingFn}
        handleKeyCommand={handleKeyCommand}
        onChange={onChange}
        editorState={editorState}
        customStyleMap={customStyleMap}
        customStyleFn={customStyleFn}
        {...props}
      />
    </div>
  );
};
