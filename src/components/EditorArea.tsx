/* interfaces */

import classNames from "classnames";
import { ContentBlock, Editor } from "draft-js";
import { getKeyBindingFunction } from "../api/default_keybindings";
import { STYLE_COMMANDS } from "../defaults/commandsDefaults";
import { PecanActions } from "../hooks/pecan_reducer";
import { EditorAreaProps } from "../types";

/* Components */

export const EditorArea = ({
  config,
  className = "",
  dispatch,
  ...props
}: EditorAreaProps) => {
  const editorConfig = config.editor;

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
    console.log(command);
    if (STYLE_COMMANDS.includes(command.toUpperCase())) {
      dispatch({ type: PecanActions.APPLY, payload: command.toUpperCase() });
      return "handled";
    } else if (command === "loop-header") {
      // } else if (BLOCK_COMMANDS.includes(command.toLowerCase())) {
      dispatch({ type: PecanActions.APPLY, payload: "header-one" });
      // dispatch({ type: PecanActions.APPLY, payload: command.toLowerCase() });
      return "handled";
    }
    return "not-handled";
  };

  const keyBindingFn = getKeyBindingFunction(config.editor.keymapLayout);

  // const keyBindingFn = (e: React.KeyboardEvent<{}>): string | null => {
  //   console.log(e, e.code, e.key);
  //   if (KeyBindingUtil.hasCommandModifier(e))
  //     switch (e.key) {
  //       case '1':
  //         return 'header-one';
  //     }

  //   return getDefaultKeyBinding(e);
  //   // if (BLOCK_COMMANDS.includes(command.toLowerCase()
  // };
  return (
    <div className={classNames(className)}>
      <Editor
        blockStyleFn={BlockStyleFn}
        spellCheck={editorConfig.spellCheckEnabled}
        keyBindingFn={keyBindingFn}
        handleKeyCommand={handleKeyCommand}
        {...props}
      />
    </div>
  );
};
